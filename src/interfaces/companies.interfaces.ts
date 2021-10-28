import { TFile } from '@hooks/use-upload-files';

export interface ICompany {
  id: string;
  name: string;
  managerTitle: string;
  isActive: boolean
  expiredTime: string;
}

// @ts-ignore
export type IGetCompanyAPIResponse = ICompany

export interface ISendFeedbackRequest {
  message: string,
  files: TFile[],
  criteria: string[],
}

export interface ISendFeedbackResponse {
  status: 'ok'
}
