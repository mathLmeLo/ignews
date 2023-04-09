import { getPrismicClient } from "@/services/prismic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { ParsedUrlQuery } from 'querystring';
import styles from './post.module.scss';

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Post = {
  slug: string,
  title: string;
  content: string;
  updatedAt: string;
}

type PostProps = {
  post: Post;
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{__html: post.content}}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> = async ({ req, params }) => {
  const session = await getSession({ req });
  const slug = params?.slug || '';

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: response.last_publication_date ? new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) : '',
  }

  return {
    props: {
      post
    }
  }
}