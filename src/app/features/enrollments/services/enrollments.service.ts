import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../core/config/app.config';
import { EnrollmentRequest, EnrollmentResponse } from '../models/enrollment.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<EnrollmentResponse[]> {
    return this.http.get<EnrollmentResponse[]>(`${APP_CONFIG.apiUrl}/Enrollment`);
  }

  create(enrollment: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(`${APP_CONFIG.apiUrl}/Enrollment`, enrollment);
  }

  update(id: number, enrollment: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.put<EnrollmentResponse>(`${APP_CONFIG.apiUrl}/Enrollment/${id}`, enrollment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${APP_CONFIG.apiUrl}/Enrollment/${id}`);
  }

  getAllSubjects() : Observable<EnrollmentResponse[]>{
   return this.http.get<EnrollmentResponse[]>(`${APP_CONFIG.apiUrl}/subject`);
  }
}
