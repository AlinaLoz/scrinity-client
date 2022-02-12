import React from 'react';
import Document, {
  Head, Html, Main, NextScript,
} from 'next/document';
import config from '@utils/config';
import { ENVIRONMENT } from '../constants';

export default class MyDocument extends Document {

  getYandexMetrica() {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                ym(87489379, 'init', {
                  clickmap:true,
                  trackLinks:true,
                  webvisor:true,
                  accurateTrackBounce:true,
                  ecommerce:"dataLayer"
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/87489379" style={{ position: 'absolute', left: '-99999999px' }} alt="" />
          </div>
        </noscript>
      </>
    );
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Scrinity</title>
          <link rel="icon" href="/images/scrinity-icon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        </Head>
        {config.ENVIRONMENT !== ENVIRONMENT.LOCAL && this.getYandexMetrica()}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}
