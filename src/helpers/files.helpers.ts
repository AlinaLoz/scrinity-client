// import { FileUpload } from 'use-file-upload';
import { TFile } from '@hooks/use-upload-files';
import Resizer from 'react-image-file-resizer';

export const resizeFile = (item: TFile): Promise<string> => new Promise((resolve) => {
  
  console.log('file.source', item);
  // @ts-ignore
  Resizer.imageFileResizer(item.file,
    1200,
    1200,
    item.file?.type,
    50,
    0,
    (uri) => {
      // @ts-ignore
      resolve(uri);
    },
    'blob',
  );
});
