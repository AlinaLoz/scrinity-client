import config from '@utils/config';

export class UrlHelper {

  static getImageSrc(filename: string): string {
    return `${config.STATIC_FILES}/${filename}`;
  }

}
