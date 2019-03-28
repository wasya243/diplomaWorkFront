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

  interface ILogInCredentials {
    email: string;
    password: string;
  }

  interface ISignUpCredentials {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
  }
}
