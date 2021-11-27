import { INSTITUTION_BY_ID_API, SEND_FEEDBACK_API, SEND_FEEDBACK_IMAGES_API } from '@constants/api.constants';
import {
  IGetInstitutionAPIResponse, ISendFeedbackImagesRequest,
  ISendFeedbackImagesResponse, ISendFeedbackRequest,
  ISendFeedbackResponse,
} from '@interfaces/companies.interfaces';
import { get, post } from '@helpers/axios.helpers';

export function getInstitutionAPI(id: string): Promise<IGetInstitutionAPIResponse> {
  return get(INSTITUTION_BY_ID_API(id));
}

export function sendFeedbackAPI(data: ISendFeedbackRequest): Promise<ISendFeedbackResponse> {
  return post(SEND_FEEDBACK_API, data);
}

export function sendFeedbackImagesAPI(data: ISendFeedbackImagesRequest): Promise<ISendFeedbackImagesResponse> {
  return post(SEND_FEEDBACK_IMAGES_API, data);
}
