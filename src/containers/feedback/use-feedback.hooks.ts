import { S3 } from 'aws-sdk';
import { resizeFile } from '@helpers/files.helpers';
import { useCallback, useState } from 'react';
import { FileUpload } from 'use-file-upload';

type TUseSendFeedbackReturn = [boolean, (items: FileUpload[]) => Promise<void> ];
export const useSendFeedback = (): TUseSendFeedbackReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const sendFeedback = useCallback(async (files: FileUpload[]) => {
    setIsLoading(true);
    const s3 = new S3({
      accessKeyId: 'AKIAU73SO2MCUBTZQJWR',
      secretAccessKey: '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',
      region: 'eu-west-1',
      signatureVersion: 'v4',
    });
    await files.reduce(async (promise, item) => {
      await promise;
      await s3.upload({
        Bucket: 'project-z-feedback',
        Body: await resizeFile(item),
        Key: item.name + Date.now().toString(),
        ContentType: item.file.type,
        ACL: 'public-read',
        CacheControl: 'max-age=31536000,s-maxage=31536000',
      }).promise();
    }, Promise.resolve());
    setIsLoading(false);
  }, []);

  return [isLoading, sendFeedback];
};
