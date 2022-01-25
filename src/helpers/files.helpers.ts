import Resizer from 'react-image-file-resizer';
import { TFile } from '@hooks/use-upload-files';

export const resizeFile = (item: TFile): Promise<string> => new Promise((resolve) => {
  // @ts-ignore
  Resizer.imageFileResizer(item.file,
    700,
    700,
    item.file?.type,
    40,
    0,
    (uri: Blob) => {
      // @ts-ignore
      resolve(uri);
    },
    'file');
});
