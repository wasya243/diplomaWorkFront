// TODO: use composition & inheritance to avoid duplication
declare namespace diploma {

  interface IProcessedClassroom {
    id: number;
    classroom: number;
  }

  interface IClassroom {
    amountOfSeats: number;
    faculty: {
      name: string;
      id: number;
    };
    number: number;
    id: number;
  }

  interface IUpdateClassroom {
    amountOfSeats: number;
    faculty: number;
    number: string;
  }

  interface ICreateClassroom {
    amountOfSeats: number;
    facultyId: number;
    number: string;
  }
}
