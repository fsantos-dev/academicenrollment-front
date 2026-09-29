import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClassmatesResponse } from '../models/classmates.model';
import { ClassmatesService } from '../services/classmates.service';
import { EnrollmentResponse } from '../../enrollments/models/enrollment.model';
import { EnrollmentsService } from '../../enrollments/services/enrollments.service';

@Injectable({
  providedIn: 'root',
})
export class ClassmatesStore {
  private readonly destroyRef = inject(DestroyRef);
  private readonly classmatesService = inject(ClassmatesService);
  private readonly enrollmentService = inject(EnrollmentsService);

  // Estado privado
  private readonly classmatesSignal = signal<ClassmatesResponse[]>([]);
  private readonly enrollmentsSignal = signal<EnrollmentResponse[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  // Selectores públicos
  readonly classmates = this.classmatesSignal.asReadonly();
  readonly enrollments = this.enrollmentsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Todas las materias donde estoy matriculado,
  // tengan o no compañeros
  readonly subjectsWithClassmates = computed(() =>
    this.enrollmentsSignal().map(enrollment => {


      const classmates = this.classmatesSignal().find(
        item => item.subjectId === enrollment.subjectId
      );

      return {
        subjectId: enrollment.subjectId,
        subjectName: enrollment.subjectName,
        professorName: enrollment.professorName,
        classmates: classmates?.classmates ?? [],
      };
    }),
  );

  readonly total = computed(
    () => this.subjectsWithClassmates().length,
  );

  loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.enrollmentService
      .getAll()
      .pipe(
        finalize(() => this.loadingSignal.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: response => {
          this.enrollmentsSignal.set(response);
        },
        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(
            this.extractError(
              err,
              'Error al cargar las matrículas',
            ),
          );
        },
      });

    this.classmatesService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: response => {
          this.classmatesSignal.set(response);
        },
        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(
            this.extractError(
              err,
              'Error al cargar los compañeros',
            ),
          );
        },
      });
  }

  private extractError(
    err: HttpErrorResponse,
    fallback: string,
  ): string {
    return (
      err.error?.detail ??
      err.error?.message ??
      fallback
    );
  }
}