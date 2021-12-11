import { INSTITUTION_BY_ID_API, CHATS_API, SEND_CHATS_IMAGES_API } from '@constants/api.constants';
import {
  IGetInstitutionAPIResponse, ISendFeedbackImagesRequest,
  ISendFeedbackImagesResponse, ISendFeedbackRequest,
  ISendFeedbackResponse,
} from '@interfaces/companies.interfaces';
import { get, post } from '@helpers/axios.helpers';

export function getInstitutionAPI(id: number | string): Promise<IGetInstitutionAPIResponse> {
  return get(INSTITUTION_BY_ID_API(id));
}

export function sendFeedbackAPI(data: ISendFeedbackRequest): Promise<ISendFeedbackResponse> {
  return post(CHATS_API, data);
}

export function sendFeedbackImagesAPI(data: ISendFeedbackImagesRequest): Promise<ISendFeedbackImagesResponse> {
  return post(SEND_CHATS_IMAGES_API, data);
}
