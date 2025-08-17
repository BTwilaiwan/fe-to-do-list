import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiResponseModel } from '../model/api-response-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private _http: HttpClient
  ) { }

  getTaskList() {
    return this._http.get<ApiResponseModel<null>>(`${environment.apis.task}/getTaskList`).pipe(map(o => o.result));
  }

  getStatus() {
    return this._http.get<ApiResponseModel<null>>(`${environment.apis.ddl}/getStatus`).pipe(map(o => o.result));
  }

  getPriority() {
    return this._http.get<ApiResponseModel<null>>(`${environment.apis.ddl}/getPriority`).pipe(map(o => o.result));
  }

  createTask(data: any) {
    let body = JSON.stringify(data);
    return this._http.post<ApiResponseModel<null>>(`${environment.apis.task}/createTask`, body, httpOptions);
  }

  deleteTask(id: any) {
    return this._http.delete<ApiResponseModel<null>>(`${environment.apis.task}/deleteTaskById/${id}`);
  }

  updateStatus(data: any) {
    let body = JSON.stringify(data);
    return this._http.put<ApiResponseModel<null>>(`${environment.apis.task}/updateStatus`, body, httpOptions);
  }

  updateTask(taskcode: string, data: any) {
    let body = JSON.stringify(data);
    return this._http.put<ApiResponseModel<null>>(`${environment.apis.task}/updateTask/${taskcode}`, body, httpOptions);
  }

}
