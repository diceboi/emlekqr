import { Geologica } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MainNav from "./components/UI/MainNav";
import Footer from "./components/UI/Footer"
import AuthProvider from "./Utils/AuthProvider";
import { getServerSession } from "next-auth";
import ContextProvider from "./Context";
import UpdateEmlekadatlapContextProvider from "./UpdateEmlekadatlapContext";
import { Toaster } from 'sonner'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const geologica = Geologica({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = getServerSession();

  return (
    <html lang="en">
      <head>
      <meta property="og:image" content="/image-kepek/ajandek.webp" />

      <Script
        id="fb-pixel"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: 
          `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1680926859153397');
          fbq('track', 'PageView');`
        }}
      ></Script>

      <Script
        id="hotjar"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: 
          ` (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5204679,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
        }}
      ></Script>

      <noscript><img height={"1"} width={"1"} style={{display: "none"}}
      src="https://www.facebook.com/tr?id=1680926859153397&ev=PageView&noscript=1"
      /></noscript>

      </head>
      <ContextProvider>
        <UpdateEmlekadatlapContextProvider>
          <AuthProvider session={session}>
            <body className={`${geologica.className} mt-[70px] bg-neutral-50`}>
              <MainNav />
              {children}
              <Footer />
            </body>
            <GoogleAnalytics gaId="G-8MXRK3GSNX" />
            <GoogleTagManager gtmId="AW-16786648939" />
          </AuthProvider>
        </UpdateEmlekadatlapContextProvider>
      </ContextProvider>
      <Toaster 
      richColors 
      position="top-center"
      />
    </html>
  );
}
