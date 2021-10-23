import { useCallback, useState } from 'react';

const validateUploadFiles = async (files: FileList | null): Promise<TFile[]>  => {
  if (!files) {
    return Promise.resolve([]);
  }
  // const result: TFile[] = [];
  return await Promise.all([...files].map((file) => {
    return new Promise<TFile>((resolve) => {
      if (!file.type.includes('image')) {
        return;
      }
      resolve({
        source: URL.createObjectURL(file),
        file: file,
      });
      // const fileData = new FileReader();
      // fileData.onloadend = (event) => {
      //   console.log('event?.target?.result', event?.target?.result);
      //   resolve({
      //     source: URL.createObjectURL(event.target.files[0]),
      //     name: file.name,
      //     type: file.type,
      //   });
      // };
      // fileData.readAsArrayBuffer(file);
    });
  }));
};


// const validateUploadFiles = (items: FileUpload | FileUpload[]): FileUpload[] => (Array.isArray(items) ? items : [items])
//   .reduce<FileUpload[]>((acc, item) => {
//   if (!item.file.type.includes('image')) {
//     return acc;
//   }
//   acc.push(item);
//   return acc;
// }, []);
//
type TUseUploadFilesReturn = [
  TFile[],
  (event: { target: HTMLInputElement; }) => void,
  (index: number) => void,
];

export type TFile = {
  source?: string;
  file?: File;
}

export const useUploadFiles = (accept = '*', multiple = true): TUseUploadFilesReturn => {
  // const [, selectFiles] = useFileUpload();
  const [files, setFiles] = useState<TFile[]>([]);

  const selectFilesWrapper = useCallback(async (event: { target: HTMLInputElement; }) => {
    setFiles(await validateUploadFiles(event.target.files));
    // selectFiles({ multiple, accept }, (items) => {
    //   setFiles(validateUploadFiles(items));
    // });
  }, []);
  const deleteFile = useCallback((index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  }, [files]);

  return [files, selectFilesWrapper, deleteFile];
};
