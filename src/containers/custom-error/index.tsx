import React from 'react';
import { useTranslation } from 'next-i18next';

import { EmptyPage } from '@components/empty-page';
import { ERROR_PAGE_IMAGE_PATH } from '@constants/ui.constants';

interface ICustomErrorProps {
  type: '404' | '500',
}

export const CustomError: React.FC<ICustomErrorProps> = ({ type }) => {
  const { t } = useTranslation('common');
  const text = type === '404' ? t('EMPTY_SCREENS.NOT_FOUND') : t('EMPTY_SCREENS.ERROR_DESCRIPTION');
  return (
    <EmptyPage
      image={ERROR_PAGE_IMAGE_PATH}
      title={t('EMPTY_SCREENS.ERROR_TITLE')}
      description={text}
    />
  );
};
