import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegistrationField, RegistrationRequest } from './registration.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  getRegistrationFields(): Observable<RegistrationField[]> {
    return this.http.get<RegistrationField[]>(`${environment.registrationUrl}/fields`);
  }

  register(body: RegistrationRequest): Observable<RegistrationRequest> {
    return this.http.post<RegistrationRequest>(`${environment.registrationUrl}/register`, body);
  }
}