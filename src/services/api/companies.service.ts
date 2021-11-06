import { COMPANIES_BY_ID_API, SEND_FEEDBACK_API, SEND_FEEDBACK_IMAGES_API } from '@constants/api.constants';
import {
  IGetCompanyAPIResponse, ISendFeedbackImagesRequest,
  ISendFeedbackImagesResponse, ISendFeedbackRequest,
  ISendFeedbackResponse,
} from '@interfaces/companies.interfaces';
import { get, post } from '@helpers/axios.helpers';

export function getCompanyAPI(id: string): Promise<IGetCompanyAPIResponse> {
  return get(COMPANIES_BY_ID_API(id));
}

export function sendFeedbackAPI(data: ISendFeedbackRequest): Promise<ISendFeedbackResponse> {
  return post(SEND_FEEDBACK_API, data);
}

export function sendFeedbackImagesAPI(data: ISendFeedbackImagesRequest): Promise<ISendFeedbackImagesResponse> {
  return post(SEND_FEEDBACK_IMAGES_API, data);
}
