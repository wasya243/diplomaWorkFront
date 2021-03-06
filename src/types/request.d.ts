declare namespace diploma {
  interface IRequest {
    id: number;
    start: string;
    end: string;
    isApproved: string;
    createdAt: string;
    faculty: string;
    classroom: number;
  }

  interface ICreateRequest {
    start: string;
    end: string;
    classroomId: number;
  }
}
