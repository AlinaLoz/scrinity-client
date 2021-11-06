import { createContext } from 'react';

export type TUserContext = {
  userId: number | null;
}

export const UserContext = createContext<TUserContext>({
  userId: null,
});
