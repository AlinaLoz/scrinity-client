import { S3 } from 'aws-sdk';
import { useCallback, useState } from 'react';

import { resizeFile } from '@helpers/files.helpers';
import { ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import { sendFeedbackAPI } from '@api/companies.service';

type TUseSendFeedbackReturn = [boolean, (data: ISendFeedbackRequest) => Promise<void> ];
export const useSendFeedback = (): TUseSendFeedbackReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const sendFeedback = useCallback(async (data: ISendFeedbackRequest) => {
    setIsLoading(true);
    const s3 = new S3({
      accessKeyId: 'AKIAU73SO2MCUBTZQJWR',
      secretAccessKey: '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',
      region: 'eu-west-1',
      signatureVersion: 'v4',
    });
    await data.files.reduce(async (promise, item) => {
      await promise;
      // console.log('item', item);
      await s3.upload({
        Bucket: 'project-z-feedback',
        Body: await resizeFile(item),
        Key: `${item.file?.name || ''}${Date.now().toString()}`,
        ContentType: item.file?.type,
        ACL: 'public-read',
        CacheControl: 'max-age=31536000,s-maxage=31536000',
      }).promise();
    }, Promise.resolve());
    await Promise.allSettled([
      sendFeedbackAPI(data),
      new Promise((res, rej) => setInterval(rej, 7000)),
    ]);

    setIsLoading(false);
  }, []);

  return [isLoading, sendFeedback];
};
