import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUserProfileSetup } from '../../interfaces/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  #http = inject(HttpClient)
  url = environment.apiUrl;
  constructor() { }

  handleUserUpdate(payload: IUserProfileSetup){
    return this.#http.patch(this.url+'users', payload);
  }

  getProblemByStack(payload: {stack: string}){
    return this.#http.patch(this.url+'users', payload);
  }
}
