import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EnrollmentStore } from '../../store/enrollments.store';
import { SubjectResponse } from '../../models/subjects.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-enrollments-list-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './enrollments-list.page.html',
  styleUrl: './enrollments-list.page.scss',
})
export class EnrollmentsListPage implements OnInit {
  private enrollmentStore = inject(EnrollmentStore);

  public subjects = this.enrollmentStore.subjects;
  public enrollments = this.enrollmentStore.enrollments;
  public totalEnrollments = this.enrollmentStore.total;
  public loading = this.enrollmentStore.loading;

  ngOnInit(): void {
    this.enrollmentStore.loadSubjects();
    this.enrollmentStore.loadAll();
  }

  deleteEnrollment(enrollmentId : number ){
    this.enrollmentStore.delete(enrollmentId);
    console.log('Eliminando subject... ', enrollmentId);
  }

  createEnrollment(subjectId: number){
    this.enrollmentStore.create({subjectId:subjectId});
  }
}
