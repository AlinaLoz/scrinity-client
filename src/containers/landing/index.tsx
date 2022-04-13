import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import LazyLoad, { forceVisible } from 'react-lazyload';
import useScrollPosition from '@react-hook/window-scroll';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';

import { ArrowIcon } from '@components/icons/arrow';
import { UrlHelper } from '@helpers/url.helper';
import Button from '@components/button';
import { InstagramIcon } from '@components/icons/fb';
import { Touchable } from '@components/touchable';
import { LandingSlider } from '@containers/landing/slider';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { INSTAGRAM_PATH, POLICY, TERMS_OF_USE } from '@constants/files.constants';
import {
  DETAIL_1, DETAIL_2, FEATURES, TARIFFS, TEAM, TEST_MODE,
} from './data';
import styles from './landing.module.scss';

const ConnectButton = (
  { type = 'blue', className = '', text = 'Подключить' }:
  { type?: 'blue' | 'white', className?: string, text?: string },
) => {
  const { setModalType } = useContext(ModalContext);

  return (
    <Button
      onClick={() => setModalType(MODAL.FEEDBACK)}
      className={cn(styles.btn, className)}
      type={type}
    >
      <span>{text}</span>
      <ArrowIcon color={type === 'white' ? '#40798C' : 'white'} />
    </Button>
  );
};

const Nav: React.FC<{ isActiveHamburger: boolean, onClose: () => void }> = ({ isActiveHamburger, onClose }) => {
  const { asPath } = useRouter();
  return (
    <ul onClick={onClose} className={cn(styles.links, { [styles.linksMobile]: isActiveHamburger })}>
      <li className="nav-item">
        <a href="#about" className={cn({ [styles.active]: asPath.includes('about') })}>О SCRINITY</a>
      </li>
      <li className="nav-item">
        <a href="#tariffs" className={cn({ [styles.active]: asPath.includes('tariffs') })}>Стоимость</a>
      </li>
      <li className="nav-item">
        <a href="#contacts" className={cn({ [styles.active]: asPath.includes('contacts') })}>Контакты</a>
      </li>
    </ul>
  );
};

const LandingPage: React.FC = () => {
  const [isActiveHamburger, setIsActiveHamburger] = useState(false);
  const scrollY = useScrollPosition(60);
  useEffect(() => {
    forceVisible();
  }, []);

  return (
    <div className={styles.landing}>
      <div className={styles.headerBlock}>
        <nav className={cn(styles.nav, { [styles.scrolled]: scrollY || isActiveHamburger })}>
          <div className={styles.logoAndUl}>
            <a href="#" className={styles.logo}>
              SCRINITY
            </a>
            <Nav isActiveHamburger={isActiveHamburger} onClose={() => setIsActiveHamburger(false)} />
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
            <ConnectButton type="blue" className={styles.desktopConnect} />
          </div>
          <ConnectButton type="white" className={styles.mobileConnect} />
          <div>
            <LazyLoad>
              <img src="/images/iphone.png" alt="iphone" className={styles.iphone} />
            </LazyLoad>
            <LazyLoad>
              <img src="/images/mac.png" alt="mac" className={styles.mac} />
            </LazyLoad>
          </div>
          <LazyLoad>
            <img src="/images/mac-mobile.png" alt="mac" className={cn(styles.mac, styles.macMobile)} />
          </LazyLoad>
        </div>
      </div>
      <div className={styles.about}>
        <h3 className={styles.blockTitle}>Преимущества платформы Scrinity:</h3>
        <div className={styles.slider}>
          <LandingSlider />
        </div>
        <LazyLoad>
          <img src="/images/graphics-mobile.png" alt="mac" className={styles.graphics} />
        </LazyLoad>
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
        <LazyLoad>
          <img src="/images/iphone-mobile.png" alt="mac" className={styles.iphoneMobile} />
        </LazyLoad>
      </div>
      <a className={styles.anchor} id="about" />
      <div className={styles.details}>
        <h3 className={styles.blockTitle}>Подробнее о проекте Scrinity.by:</h3>
        <div className={styles.content}>
          <div>
            <p><b>Scrinity</b> – это независимый сервис, который собирает реальные отзывы о компаниях, заведениях, предприятиях.</p>
            <p>Мы помогаем владельцам компаний посмотреть на бизнес глазами клиентов.</p>
            <br />
            <p><b>Как это работает?</b></p>
            {isMobile ? (
              <details>
                <summary>Подробнее</summary>
                <DETAIL_1 />
              </details>
            ) : <DETAIL_1 />}
          </div>
          <div>
            {isMobile && <br />}
            <p><b> Кому это будет полезно?</b></p>
            {isMobile ? (
              <details>
                <summary>Подробнее</summary>
                <DETAIL_2 />
              </details>
            ) : <DETAIL_2 />}
          </div>
        </div>
      </div>
      <a className={cn(styles.anchor, styles.tariffsAnchor)} id="tariffs" />
      <div className={styles.tariffs}>
        <h3 className={styles.blockTitle}>Найдите свой тариф</h3>
        {TEST_MODE
          ? (
            <h5 className={styles.description}>
              Сейчас идет тестирование, если хотите присоединиться оставьте вашу почту или номер телефон по кнопке ниже
            </h5>
          )
          : (<h5 className={styles.description}>Срок пробного <b>бесплатного</b> периода 7 дней</h5>)}
        <div className={styles.tariffsList}>
          {TEST_MODE ? (<ConnectButton type="blue" text="Попробовать" />) : TARIFFS.map(({
            DESCRIPTION, FEATURES: tariffFeatures, NAME, PRICE,
          }) => (
            <div className={styles.tariff} key={NAME}>
              <p className={styles.name}>{NAME}</p>
              <p className={styles.price}>Индивидуально</p>
              <p className={styles.description}>{DESCRIPTION}</p>
              <ul className={styles.features}>
                {tariffFeatures.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ConnectButton type="white" />
            </div>
          ))}

        </div>
      </div>
      <div className={styles.team}>
        <h3 className={styles.blockTitle}>Наша команда</h3>
        <div className={styles.members}>
          {TEAM.map(({ IMAGE, NAME }) => (
            <div className={styles.member} key={IMAGE}>
              <LazyLoad><img src={IMAGE} alt={NAME} /></LazyLoad>
              <p className={styles.name}>{NAME}</p>
            </div>
          ))}
        </div>
      </div>
      {/*
        <div className={styles.feedbacks}>
          {!isMobile ? (
            <>
              <div className={styles.content}>
                <h5 className={styles.blockTitle}>Отзывы</h5>
                <p className={styles.text}>SCRINITY - новый крутой сервис по работе
                  с обратной связью ваших гостей. Простое решение, которое позволит
                  бизнесу решить сразу несколько проблем: узнать и решить проблему Гостя,
                  вернуть и удержать, повысить лояльность и увеличить рост выручки.
                </p>
              </div>
              <video width="592px" height="373px" className={styles.video} controls>
                <source src={UrlHelper.getStaticFile('scrinity.mp4')} />
                <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                Your browser does not support HTML video.
              </video>
            </>
          ) : (
            <>
              <h5 className={styles.blockTitle}>Отзывы</h5>
              <video width="592px" height="373px" className={styles.video} controls>
                <source src={UrlHelper.getStaticFile('scrinity.mp4')} />
                <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                Your browser does not support HTML video.
              </video>
              <p className={styles.text}>SCRINITY - новый крутой сервис по работе
                с обратной связью ваших гостей. Простое решение, которое позволит
                бизнесу решить сразу несколько проблем: узнать и решить проблему Гостя,
                вернуть и удержать, повысить лояльность и увеличить рост выручки.
              </p>
            </>
          )}
        </div>
      */}
      <a className={cn(styles.anchor, styles.teamAnchor)} id="contacts" />
      <footer className={styles.footer}>
        <div className={styles.titles}>
          <p className={styles.title}>SCRINITY</p>
          <p className={styles.allReserved}>© 2021 All rights reserved</p>
        </div>
        <div className={styles.documents}>
          <a
            target="_blank"
            rel="noreferrer nofollow noopener"
            href={UrlHelper.getStaticFile(POLICY)}
            className={styles.alink}
          >
            Privacy Policy
          </a>
          <a
            target="_blank"
            rel="noreferrer nofollow noopener"
            href={UrlHelper.getStaticFile(TERMS_OF_USE)}
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
            href={INSTAGRAM_PATH}
            aria-label="icon"
          >
            <InstagramIcon />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LandingPage), {
  ssr: false,
});
