import { FileUpload, useFileUpload } from 'use-file-upload';
import { useCallback, useState } from 'react';

const validateUploadFiles = (items: FileUpload | FileUpload[]): FileUpload[] => (Array.isArray(items) ? items : [items])
  .reduce<FileUpload[]>((acc, item) => {
  if (!item.file.type.includes('image')) {
    return acc;
  }
  acc.push(item);
  return acc;
}, []);

type TUseUploadFilesReturn = [
  FileUpload[],
  () => void,
  (index: number) => void,
];
export const useUploadFiles = (accept = 'image/*', multiple = true): TUseUploadFilesReturn => {
  const [, selectFiles] = useFileUpload();
  const [files, setFiles] = useState<FileUpload[]>([]);

  const selectFilesWrapper = useCallback(() => {
    selectFiles({ multiple, accept }, (items) => {
      setFiles(validateUploadFiles(items));
    });
  }, []);
  const deleteFile = useCallback((index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  }, [files]);

  return [files, selectFilesWrapper, deleteFile];
};
