declare namespace diploma {

  import IFaculty = diploma.IFaculty;
  import IGroup = diploma.IGroup;
  import IDoubleLesson = diploma.IDoubleLesson;
  import IUser = diploma.IUser;

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

  interface ICreateAssignment {
    doubleLessonId: number;
    groupId: number;
    classroomId: number;
    assignmentDate: string;
  }

  interface ICreatedAssignment {
    id: number;
    assignmentDate: string;
    classroom: {
      id: number;
      amountOfSeats: number;
      number: number;
      faculty: IFaculty
    };
    dispatcher: IUser;
    doubleLesson: IDoubleLesson;
    group: IGroup;
  }
}
