declare namespace diploma {
  interface IGroup {
    id: number;
    name: string;
    amountOfPeople: number;
    faculty: {
      id: number;
      name: string;
    };
  }
}
