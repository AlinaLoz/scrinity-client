import React, { useState } from 'react';
import cn from 'classnames';
import ReactIdSwiper from 'react-id-swiper';
import DirectionButton from '@components/direction-button';
import { SwiperInstance } from 'react-id-swiper/lib/types';
import styles from './slider.module.scss';

const params = {
  slidesPerView: 3,
  spaceBetween: 67,
  loop: true,
  pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
  breakpoints: {
    768: { slidesPerView: 1, spaceBetween: 0 },
    1000: { slidesPerView: 2, spaceBetween: 30 },
    1280: { slidesPerView: 2, spaceBetween: 30 },
    1281: { slidesPerView: 3, spaceBetween: 67 },
  },
};

export const CustomSlider: React.FC<{ className?: string }> = ({ children, className = '' }) => {
  const [swiper, updateSwiper] = useState<SwiperInstance | null>(null);
  const [, setActiveSlide] = useState(1);

  const goNext = (e: any) => {
    e.target.blur();
    if (swiper !== null) {
      swiper.slideNext();
      setActiveSlide((prev) => prev + 1);
    }
  };
  const goPrev = (e: any) => {
    e.target.blur();
    if (swiper !== null) {
      swiper.slidePrev();
      setActiveSlide((prev) => prev - 1);
    }
  };

  return (
    <div className={cn(styles.sliderWrapper, className)}>
      <ReactIdSwiper
        getSwiper={updateSwiper}
        {...params}
      >
        {children as any}
      </ReactIdSwiper>
      <DirectionButton
        direction="left"
        className={cn(styles.prev, styles.button, { [styles.disabled]: swiper?.isBeginning })}
        onClick={goPrev}
      />
      <DirectionButton
        direction="right"
        className={cn(styles.next, styles.button, { [styles.disabled]: swiper?.isEnd })}
        onClick={goNext}
      />
    </div>
  );
};
