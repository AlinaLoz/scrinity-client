import { TFile } from '@hooks/use-upload-files';

interface ICriterion {
  isGood: boolean;
  key: string;
}

export interface ICompany {
  id: string;
  name: string;
  managerTitle: string;
  isActive: boolean;
  expiredTime: string;
  criterions: ICriterion[];
}

export type IGetCompanyAPIResponse = ICompany;

export interface ISendFeedbackRequest {
  message: string;
  companyId: string;
  filesKeys?: string[];
  criterions: string[];
  isGood: boolean;
}

export type ISendFeedbackImagesRequest = FormData

export interface ISendFeedbackImagesResponse {
  imagesKeys: string[];
}

export interface ISendFeedbackResponse {
  status: 'ok'
}
