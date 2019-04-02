// TODO: use composition & inheritance to avoid duplication
declare namespace diploma {
  interface IFaculty {
    name: string;
    director: string;
    address: string;
    phoneNumber: string;
    website: string;
    id: number;
  }

  interface IUpdateFaculty {
    name: string;
    director: string;
    address: string;
    phoneNumber: string;
    website: string;
  }

  interface IProcessedFaculty {
    id: number;
    name: string;
  }
}
