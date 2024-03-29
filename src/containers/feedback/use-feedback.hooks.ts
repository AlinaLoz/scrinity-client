import {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';

import { ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import { sendFeedbackAPI, sendFeedbackImagesAPI } from '@api/companies.service';
import { TFile } from '@hooks/use-upload-files';
import { getFirstResponseError } from '@helpers/message.helper';
import { resizeFile } from '@helpers/files.helpers';

type TUploadFeedbackImagesReturn = [(files: TFile[]) => Promise<string[]>];
const uploadFeedbackImages = (): TUploadFeedbackImagesReturn => {
  const uploadImages = async (files: TFile[]) => {
    const data = new FormData();
    await Promise.all(files.map(async (file) => {
      data.append('images', await resizeFile(file));
    }));
    const { imagesKeys } = await sendFeedbackImagesAPI(data);
    return imagesKeys;
  };
  return [uploadImages];
};

type TUseSendFeedbackReturn = [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (data: ISendFeedbackRequest & { files: TFile[] }) => Promise<boolean>,
];
export const useSendFeedback = (): TUseSendFeedbackReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [uploadImages] = uploadFeedbackImages();

  const sendFeedback = useCallback(async (data: ISendFeedbackRequest & { files: TFile[] }) => {
    setIsLoading(true);
    try {
      const filesKeys: string[] = [];
      if (data.files.length) {
        filesKeys.push(...await uploadImages(data.files));
      }
      await sendFeedbackAPI({ ...data, filesKeys });
      return true;
    } catch (err) {
      setError(getFirstResponseError(err));
      return false;
    } finally {
      setIsLoading(false);
    }

  }, []);

  return [isLoading, error, setError, sendFeedback];
};
