import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from '../models/layout'
import Layout from '../components/Layout'
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";
import NProgress from "nprogress";
import Router from "next/router";
import instance from '../api/config';
import { SWRConfig } from "swr";


NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? Layout;
  return <LayoutWrapper>
    <SWRConfig
      value={{
        fetcher: async (url: string) => instance.get(url),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </LayoutWrapper>

}

export default MyApp
