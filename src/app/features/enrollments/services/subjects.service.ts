import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../core/config/app.config';
import { EnrollmentRequest, EnrollmentResponse } from '../models/enrollment.model';
import { SubjectResponse } from '../models/subjects.model';

@Injectable({ providedIn: 'root' })
export class SubjectsService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<SubjectResponse[]> {
    return this.http.get<SubjectResponse[]>(`${APP_CONFIG.apiUrl}/Subject`);
  }

}
