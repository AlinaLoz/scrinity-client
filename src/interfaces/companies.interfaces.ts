import { TFile } from '@hooks/use-upload-files';

export interface ICompany {
  id: string;
  name: string;
  managerTitle: string;
  isActive: boolean
  expiredTime: string;
}

export interface IGetCompanyAPIResponse extends ICompany {}

export interface ISendFeedbackRequest {
  message: string,
  files: TFile[],
  criteria: string[],
}

export interface ISendFeedbackResponse {}
