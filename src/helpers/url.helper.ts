import config from '@utils/config';

export class UrlHelper {

  static getStaticFile(filename: string): string {
    return `${config.STATIC_FILES}/${filename}`;
  }

}
