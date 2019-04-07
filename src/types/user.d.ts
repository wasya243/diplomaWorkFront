// TODO: use inheritance & composition to avoid duplication
declare namespace diploma {
  interface IUserData {
    userInfo: Partial<IUser>;
    accessToken: string;
  }

  interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
    role: string;
  }

  interface IUpdateUser {
    email: string;
    firstName: string;
    lastName: string;
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

  interface IRegistrationRequest {
    email: string;
    firstName: string;
    lastName: string;
    faculty: string;
    id: number;
  }

  interface IPermittedRegistrationRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    id: number;
    isPermitted: boolean;
  }
}
