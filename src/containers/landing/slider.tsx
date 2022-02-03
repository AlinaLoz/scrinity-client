import React from 'react';
import { ABOUT } from '@containers/landing/data';
import cn from 'classnames';
import { isMobile } from 'mobile-device-detect';

import { CustomSlider } from '@components/slider';
import styles from './landing.module.scss';

interface ISlideProps {
  icon: string,
  name: string,
  description: string;
}

const Slide: React.FC<ISlideProps> = ({ icon, name, description }) => (
  <div className={cn('swiper-slide', styles.slide)}>
    <img src={icon} alt="" />
    <p className={styles.name}>{name}</p>
    <p className={styles.description}>{description}</p>
  </div>
);

export const LandingSlider = () => {
  const render = () => ABOUT.map(({ IMAGE, NAME, DESCRIPTIONS }) => (
    <Slide
      key={IMAGE}
      icon={IMAGE}
      name={NAME}
      description={DESCRIPTIONS}
    />
  ));

  return isMobile ? (
    <div className={cn(styles.swiper, styles.swiperMobile)}>
      {render()}
    </div>
  ) : (
    <CustomSlider className={styles.swiper}>
      {render()}
    </CustomSlider>
  );
};
