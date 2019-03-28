declare namespace diploma {
  interface IUserData {
    userInfo: Partial<IUser>;
    accessToken: string;
  }

  interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
    role: string;
  }

  interface ICredentials {
    email: string;
    password: string;
  }
}
