import { FileUpload } from 'use-file-upload';
import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: FileUpload): Promise<string> => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file.file,
    1200,
    1200,
    file.file.type,
    50,
    0,
    (uri) => {
      // @ts-ignore
      resolve(uri);
    },
    'blob',
  );
});
