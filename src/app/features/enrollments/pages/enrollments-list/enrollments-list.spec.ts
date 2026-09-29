import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { EnrollmentsListPage } from './enrollments-list.page';
import { EnrollmentStore } from '../../store/enrollments.store';

describe('EnrollmentsListPage', () => {
  let component: EnrollmentsListPage;
  let fixture: ComponentFixture<EnrollmentsListPage>;

  let enrollmentStoreMock: {
    subjects: ReturnType<typeof vi.fn>;
    enrollments: ReturnType<typeof vi.fn>;
    total: ReturnType<typeof vi.fn>;
    loading: ReturnType<typeof vi.fn>;
    loadSubjects: ReturnType<typeof vi.fn>;
    loadAll: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    enrollmentStoreMock = {
      subjects: vi.fn(),
      enrollments: vi.fn(),
      total: vi.fn(),
      loading: vi.fn(),
      loadSubjects: vi.fn(),
      loadAll: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [EnrollmentsListPage],
      providers: [
        {
          provide: EnrollmentStore,
          useValue: enrollmentStoreMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentsListPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load subjects and enrollments on init', () => {
    component.ngOnInit();

    expect(enrollmentStoreMock.loadSubjects).toHaveBeenCalledTimes(1);
    expect(enrollmentStoreMock.loadAll).toHaveBeenCalledTimes(1);
  });

  it('should delete enrollment', () => {
    const enrollmentId = 10;

    component.deleteEnrollment(enrollmentId);

    expect(enrollmentStoreMock.delete).toHaveBeenCalledTimes(1);
    expect(enrollmentStoreMock.delete).toHaveBeenCalledWith(enrollmentId);
  });

  it('should create enrollment with subject id', () => {
    const subjectId = 5;

    component.createEnrollment(subjectId);

    expect(enrollmentStoreMock.create).toHaveBeenCalledTimes(1);
    expect(enrollmentStoreMock.create).toHaveBeenCalledWith({
      subjectId,
    });
  });
});