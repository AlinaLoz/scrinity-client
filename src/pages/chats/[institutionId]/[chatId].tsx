import { Chat } from '@containers/chats/chat';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGUAGE } from '@constants/locales.constants';

export default Chat;
export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || LANGUAGE.RU)),
  },
});
