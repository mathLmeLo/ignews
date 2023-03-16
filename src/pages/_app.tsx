import { Header } from "@/components/Header";
import { AppProps } from "next/app"
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
