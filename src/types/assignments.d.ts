declare namespace diploma {
  interface IAssignment {
    assignmentDate: string;
    assignments: [ {
      id: number;
      groupId: number;
      doubleLessonId: number;
      classroom: {
        id: number;
        number: number;
        amountOfSeats: number;
        facultyId: number;
      }
      createdAt: string;
    } ];
  }
}
