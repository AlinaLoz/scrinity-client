import { useRouter } from 'next/router';

type TUseDataFromQueryReturn = {
  institutionId: number;
  chatId: number;
};

export const useDataFromQuery = (): TUseDataFromQueryReturn => {
  const router = useRouter();

  const institutionId = +(router.query.institutionId || '0');
  const chatId = +(router.query.chatId as string || '0');

  return {
    chatId, institutionId,
  };
};
