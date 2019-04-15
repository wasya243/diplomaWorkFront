declare namespace diploma {

  interface IReport {
    assignmentDate: string;
    classrooms: [ {
      classroomNumber: number;
      usages: [ {
        doubleLessonNumber: number;
        count: number;
      } ];
      totalUse: number;
    } ];
  }
}
