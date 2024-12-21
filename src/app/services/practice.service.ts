import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { BaseResponse, Result } from '../../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  #http = inject(HttpClient)
  url = environment.apiUrl;
  constructor() { }

  getProblemByStack(limit=100){
    return this.#http.get(this.url+`interviewquestions?limit=${limit}`);
  }

  submitProblem(payload:FormData, problem_id:string):Observable<Result>{
    return this.#http.post<Result>(this.url+`responses/${problem_id}`, payload);
  }
}
