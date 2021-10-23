import React from 'react';
import cn from 'classnames';
import { LoadPhotoIcon } from '@components/icons/load-photo';
import styles from './upload-button.module.scss';

export interface IUploadButton {
  className?: string;
  accept?: string;
  onLoadPhoto: () => void;
}

export const UploadButton: React.FC<IUploadButton> = ({
  className, onLoadPhoto,
}) => (
  <div className={cn(styles.uploadBox, className)}>
    <LoadPhotoIcon className={styles.image} onClick={onLoadPhoto} />
  </div>
);
