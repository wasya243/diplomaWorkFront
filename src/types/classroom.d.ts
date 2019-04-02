// TODO: use composition & inheritance to avoid duplication
declare namespace diploma {
  interface IClassroom {
    amountOfSeats: number;
    faculty: {
      name: string;
      id: number;
    };
    number: string;
    id: number;
  }

  interface IUpdateClassroom {
    amountOfSeats: number;
    faculty: number;
    number: string;
  }
}
