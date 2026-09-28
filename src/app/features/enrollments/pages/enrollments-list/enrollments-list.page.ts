import { Component, inject, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { EnrollmentStore } from "../../store/enrollments.store";
import { SubjectResponse } from "../../models/subjects.model";

@Component({
  selector: 'app-enrollments-list-page',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './enrollments-list.page.html',
  styleUrl: './enrollments-list.page.scss',
})
export class EnrollmentsListPage implements OnInit {
   private enrollmentStore = inject(EnrollmentStore);

   private subjects  = this.enrollmentStore.subjects;

    ngOnInit(): void {
      this.enrollmentStore.loadSubjects();
      console.log('LISTA DE MATERIAS: ', this.subjects);
  }
}