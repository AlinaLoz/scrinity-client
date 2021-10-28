import React from 'react';
import { useTranslation } from 'next-i18next';

import { ERROR_PAGE_IMAGE_PATH } from '@constants/ui.constants';
import { EmptyPage } from '../components/empty-page';

interface IErrorProps {
  onNext: () => void;
}

export const Error: React.FC<IErrorProps> = ({ onNext }) => {
  const { t } = useTranslation('common');

  return (
    <EmptyPage
      onNext={onNext}
      image={ERROR_PAGE_IMAGE_PATH}
      title={t('EMPTY_SCREENS.ERROR_TITLE')}
      description={t('EMPTY_SCREENS.ERROR_DESCRIPTION')}
    />
  );
};
