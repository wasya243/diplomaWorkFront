import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import IGroup = diploma.IGroup;
import IUpdateGroup = diploma.IUpdateGroup;
import ICreateGroup = diploma.ICreateGroup;

@Injectable()
export class GroupsService {

  private initGroupCreationSubject = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Array<IGroup>> {
    return this.http.get<IGroup[]>(`/groups`);
  }

  createGroup(groupData: ICreateGroup): Observable<any> {
    return this.http.post<any>(`/groups`, groupData);
  }

  getGroupsByFaculty(facultyId: number): Observable<Array<IGroup>> {
    return this.http.get<IGroup[]>(`/faculties/${facultyId}/groups`);
  }

  removeGroup(groupId: number): Observable<{}> {
    return this.http.delete(`/groups/${groupId}`);
  }

  updateGroup(groupId: number, groupData: IUpdateGroup): Observable<IGroup> {
    return this.http.put<IGroup>(`/groups/${groupId}`, groupData);
  }

  onInitGroupCreationSubject(): Subject<void> {
    return this.initGroupCreationSubject;
  }

  initGroupCreation(): void {
    this.initGroupCreationSubject.next();
  }
}
