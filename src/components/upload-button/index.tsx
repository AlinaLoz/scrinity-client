import React from 'react';
import cn from 'classnames';
import { LoadPhotoIcon } from '@components/icons/load-photo';
import styles from './upload-button.module.scss';

export interface IUploadButton {
  className?: string;
  accept?: string;
  onLoadPhoto: (event: { target: HTMLInputElement; }) => void;
}

export const UploadButton: React.FC<IUploadButton> = ({
  className, onLoadPhoto,
}) => (
  <div className={cn(styles.uploadBox, className)}>
    <label htmlFor="upload-photo">
      <LoadPhotoIcon className={styles.image} />
      <input onChange={onLoadPhoto} type="file" multiple name="photo" id="upload-photo" />
    </label>
  </div>
);
