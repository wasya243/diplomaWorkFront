import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IGroup = diploma.IGroup;
import IUpdateGroup = diploma.IUpdateGroup;

@Injectable()
export class GroupsService {

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Array<IGroup>> {
    return this.http.get<IGroup[]>(`/groups`);
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
}
