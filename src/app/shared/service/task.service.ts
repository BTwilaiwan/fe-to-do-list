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

}
