import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  #http = inject(HttpClient)
  url = environment.apiUrl;
  constructor() { }

  getProblemByStack(){
    return this.#http.get(this.url+'interviewquestions?limit=100');
  }

  submitProblem(payload:{}){
    return this.#http.post(this.url+'', payload);
  }
}
