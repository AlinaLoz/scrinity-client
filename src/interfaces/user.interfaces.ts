export interface IUser {
  id: number;
  phoneNumber: string;
}

export interface IGetMeAPIResponse {
  user: IUser | null;
}
