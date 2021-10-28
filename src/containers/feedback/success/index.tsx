import React from 'react';
import { useTranslation } from 'next-i18next';

import { SUCCESS_PAGE_IMAGE_PATH } from '@constants/ui.constants';
import { EmptyPage } from '../components/empty-page';

interface ISuccessProps {
  onNext: () => void;
}

export const Success: React.FC<ISuccessProps> = ({ onNext }) => {
  const { t } = useTranslation('common');

  return (
    <EmptyPage
      onNext={onNext}
      image={SUCCESS_PAGE_IMAGE_PATH}
      title={t('EMPTY_SCREENS.SUCCESS_TITLE')}
      description={t('EMPTY_SCREENS.SUCCESS_DESCRIPTION')}
    />
  );
};
