import React, { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import useScrollPosition from '@react-hook/window-scroll';

import { ArrowIcon } from '@components/icons/arrow';
import { FEATURES, TARIFFS, TEAM } from '@containers/landing/data';
import { UrlHelper } from '@helpers/url.helper';
import Button from '@components/button';
import { FbIcon } from '@components/icons/fb';
import { Touchable } from '@components/touchable';
import { LandingSlider } from '@containers/landing/slider';
import dynamic from 'next/dynamic';
import styles from './landing.module.scss';

const ConnectButton = ({ type = 'blue' }: { type?: 'blue' | 'white' }) => (
  <Button className={styles.btn} type={type}>
    <span>Подключить</span>
    <ArrowIcon color={type === 'white' ? '#40798C' : 'white'} />
  </Button>
);

const LandingPage: React.FC = () => {
  const { asPath } = useRouter();
  const [isActiveHamburger, setIsActiveHamburger] = useState(false);
  const scrollY = useScrollPosition(60);

  return (
    <div className={styles.landing}>
      <div className={styles.headerBlock}>
        <nav className={cn(styles.nav, { [styles.scrolled]: scrollY })}>
          <div className={styles.logoAndUl}>
            <a href="#" className={styles.logo}>
              SCRINITY
            </a>
            <ul className={styles.links}>
              <li className="nav-item">
                <a href="#about" className={cn({ [styles.active]: asPath.includes('about') })}>О SCRINITY</a>
              </li>
              <li className="nav-item">
                <a href="#tariffs" className={cn({ [styles.active]: asPath.includes('tariffs') })}>Стоимость</a>
              </li>
            </ul>
          </div>
          <Touchable
            onClick={() => setIsActiveHamburger(!isActiveHamburger)}
            className={cn(styles.hamburger, { [styles.active]: isActiveHamburger })}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </Touchable>
          <ConnectButton />
        </nav>
        <div className={styles.mainInfo}>
          <div>
            <h1 className={styles.title}><span>SCRINITY</span><span> - платформа для удержания и возврата клиентов</span></h1>
            <div className={styles.description}>Повышайте лояльность клиента с помощью сервиса обратной связи SCRINITY</div>
          </div>
          <ConnectButton type="white" />
          <div>
            <LazyLoad>
              <img src="/images/iphone.png" alt="iphone" className={styles.iphone} />
            </LazyLoad>
            <LazyLoad>
              <img src="/images/mac.png" alt="mac" className={styles.mac} />
            </LazyLoad>
          </div>
          {/* <LazyLoad> */}
          <img src="/images/mac-mobile.png" alt="mac" className={cn(styles.mac, styles.macMobile)} />
          {/* </LazyLoad> */}
        </div>
      </div>
      <div className={styles.about} id="about">
        <h3 className={styles.blockTitle}>О Scrinity:</h3>
        <div className={styles.slider}>
          <LandingSlider />
        </div>
      </div>
      <div className={styles.benefits}>
        <h3 className={styles.blockTitle}>Вместе со Scrinity Вы:</h3>
        <div className={styles.features}>
          {FEATURES.map(({ TITLE, ICON, DESCRIPTION }) => (
            <div className={styles.feature} key={DESCRIPTION}>
              <img src={ICON} alt={ICON} className={styles.featureImg} />
              <p className={styles.featureTitle}>{TITLE}</p>
              <p className={styles.featureDescription}>{DESCRIPTION}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.team}>
        <h3 className={styles.blockTitle}>Наша команда</h3>
        <div className={styles.members}>
          {TEAM.map(({ IMAGE, NAME, DESCRIPTIONS }) => (
            <div className={styles.member} key={IMAGE}>
              <img src={IMAGE} alt={NAME} />
              <p className={styles.name}>{NAME}</p>
              <ul>
                {DESCRIPTIONS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tariffs} id="tariffs">
        <h3 className={styles.blockTitle}>Найдите свой тариф</h3>
        <h5 className={styles.description}>Срок пробного бесплатного периода 7 дней</h5>
        <div className={styles.tariffsList}>
          {TARIFFS.map(({
            DESCRIPTION, FEATURES: tariffFeatures, NAME, PRICE,
          }) => (
            <div className={styles.tariff} key={NAME}>
              <p className={styles.name}>{NAME}</p>
              <p className={styles.price}>{PRICE} BYN</p>
              <p className={styles.description}>{DESCRIPTION}</p>
              <ul className={styles.features}>
                {tariffFeatures.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ConnectButton type="white" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.feedbacks}>
        <div className={styles.content}>
          <h5 className={styles.blockTitle}>Отзывы</h5>
          <p className={styles.text}>SCRINITY - новый крутой сервис по работе
            с обратной связью ваших гостей. Простое решение, которое позволит
            бизнесу решить сразу несколько проблем: узнать и решить проблему Гостя,
            вернуть и удержать, повысить лояльность и увеличить рост выручки.
          </p>
        </div>
        <video width="592px" height="373px" className={styles.video} controls>
          <source src={UrlHelper.getImageSrc('scrinity.mp4')} />
          <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
          Your browser does not support HTML video.
        </video>
      </div>
      <footer className={styles.footer}>
        <div>
          <p className={styles.title}>SCRINITY</p>
          <p className={styles.allReserved}>© 2021 All rights reserved</p>
        </div>
        <div className={styles.documents}>
          <a
            target="_blank"
            rel="noreferrer nofollow noopener"
            href="https://project-z-images.s3.eu-west-1.amazonaws.com/policy.pdf"
            className={styles.alink}
          >
            Privacy Policy
          </a>
          <a
            target="_blank"
            rel="noreferrer nofollow noopener"
            href="https://project-z-images.s3.eu-west-1.amazonaws.com/policy.pdf"
            className={styles.alink}
          >
            Terms of Conditions
          </a>
        </div>
        <div className={styles.networks}>
          <a
            className={styles.socLink}
            target="_blank"
            rel="noreferrer nofollow noopener"
            href="https://www.facebook.com/scrinity.by"
            aria-label="icon"
          >
            <FbIcon />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LandingPage), {
  ssr: false,
});
