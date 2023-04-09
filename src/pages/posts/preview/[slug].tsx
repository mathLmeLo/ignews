import { getPrismicClient } from "@/services/prismic";
import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { ParsedUrlQuery } from 'querystring';
import styles from '../post.module.scss';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type PostPreview = {
  slug: string,
  title: string;
  content: string;
  updatedAt: string;
}

type PostPreviewProps = {
  post: PostPreview;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])


  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              Subscribe now 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostPreviewProps, Params> = async ({ params }) => {
  const slug = params?.slug || '';

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: response.last_publication_date ? new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) : '',
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutes
  }
}