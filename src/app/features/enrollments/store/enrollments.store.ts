import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';

import { EnrollmentRequest, EnrollmentResponse } from '../models/enrollment.model';

import { SubjectResponse } from '../models/subjects.model';

import { EnrollmentsService } from '../services/enrollments.service';
import { SubjectsService } from '../services/subjects.service';

@Injectable({ providedIn: 'root' })
export class EnrollmentStore {
  private readonly destroyRef = inject(DestroyRef);

  private readonly enrollmentService = inject(EnrollmentsService);
  private readonly subjectService = inject(SubjectsService);

  private readonly messageService = inject(MessageService);

  // Estado privado

  private readonly enrollmentsSignal = signal<EnrollmentResponse[]>([]);

  private readonly subjectsSignal = signal<SubjectResponse[]>([]);

  private readonly enrollmentSelectedSignal = signal<EnrollmentResponse | null>(null);

  private readonly loadingSignal = signal(false);

  private readonly successSignal = signal(false);

  private readonly errorSignal = signal<string | null>(null);

  // Selectores públicos

  readonly enrollments = this.enrollmentsSignal.asReadonly();

  readonly subjects = computed(() =>
    this.subjectsSignal().map((subject) => {
      const enrollment = this.enrollmentsSignal().find(
        (enrollment) => enrollment.subjectId === subject.id,
      );

      const profesorRepetido = this.enrollmentsSignal().some(
        (enrollment) => enrollment.professorId === subject.professorId,
      );

      return {
        ...subject,
        estado: enrollment ? 'inscrita' : profesorRepetido ? 'profesor_repetido' : 'disponible',
        enrollmentId: enrollment?.id ?? null,
      };
    }),
  );

  readonly enrollmentSelected = this.enrollmentSelectedSignal.asReadonly();

  readonly loading = this.loadingSignal.asReadonly();

  readonly success = this.successSignal.asReadonly();

  readonly error = this.errorSignal.asReadonly();

  readonly total = computed(() => this.enrollmentsSignal().length);

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
        next: (response) => {
          console.log('Enrollments: ', response);
          this.enrollmentsSignal.set(response);
        },
        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(this.extractError(err, 'Error al cargar las matrículas'));
        },
      });
  }

  loadSubjects(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.subjectService
      .getAll()
      .pipe(
        finalize(() => this.loadingSignal.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          console.log('Subjects: ', response);
          this.subjectsSignal.set(response);
        },
        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(this.extractError(err, 'Error al cargar las materias'));
        },
      });
  }

  create(enrollment: EnrollmentRequest): void {
    this.loadingSignal.set(true);
    this.successSignal.set(false);
    this.errorSignal.set(null);

    this.enrollmentService
      .create(enrollment)
      .pipe(
        finalize(() => {
          // setTimeout(() => {
            this.loadingSignal.set(false);
          // }, 5000);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (newEnrollment) => {
          this.enrollmentsSignal.update((list) => [...list, newEnrollment]);

          this.successSignal.set(true);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Materia ${newEnrollment.subjectName} agregada.`,
          });
        },

        error: (err: HttpErrorResponse) => {
          console.log('Error: ', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err?.error?.detail}`,
          });
          this.errorSignal.set(this.extractError(err, 'Error al crear la matrícula'));
        },  
      });
  }

  update(id: number, enrollment: EnrollmentRequest): void {
    this.loadingSignal.set(true);
    this.successSignal.set(false);
    this.errorSignal.set(null);

    this.enrollmentService
      .update(id, enrollment)
      .pipe(
        finalize(() => this.loadingSignal.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (updatedEnrollment) => {
          this.enrollmentsSignal.update((list) =>
            list.map((item) => (item.id === id ? updatedEnrollment : item)),
          );

          if (this.enrollmentSelectedSignal()?.id === id) {
            this.enrollmentSelectedSignal.set(updatedEnrollment);
          }

          this.successSignal.set(true);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Materia ${updatedEnrollment.subjectName} actualizada.`,
          });
        },

        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(this.extractError(err, 'Error al actualizar la matrícula'));
        },
      });
  }

  delete(id: number): void {
    this.loadingSignal.set(true);
    this.successSignal.set(false);
    this.errorSignal.set(null);

    this.enrollmentService
      .delete(id)
      .pipe(
        finalize(() => this.loadingSignal.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.enrollmentsSignal.update((list) => list.filter((item) => item.id !== id));

          if (this.enrollmentSelectedSignal()?.id === id) {
            this.enrollmentSelectedSignal.set(null);
          }

          this.successSignal.set(true);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Matrícula eliminada correctamente.',
          });
        },

        error: (err: HttpErrorResponse) => {
          this.errorSignal.set(this.extractError(err, 'Error al eliminar la matrícula'));
        },
      });
  }

  select(enrollment: EnrollmentResponse): void {
    this.enrollmentSelectedSignal.set(enrollment);
  }

  clearSelection(): void {
    this.enrollmentSelectedSignal.set(null);
  }

  private extractError(err: HttpErrorResponse, fallback: string): string {
    return err.error?.detail ?? err.error?.message ?? fallback;
  }
}
