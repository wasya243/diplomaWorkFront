declare namespace diploma {
  interface IGroup {
    id: number;
    name: string;
    amountOfPeople: number;
    yearStart: number;
    yearEnd: number;
    faculty: {
      id: number;
      name: string;
    };
  }

  interface IUpdateGroup {
    yearStart: number;
    yearEnd: number;
    amountOfPeople: number;
    name: string;
  }
}
