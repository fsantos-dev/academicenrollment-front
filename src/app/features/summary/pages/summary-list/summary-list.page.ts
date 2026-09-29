import { Component, inject, OnInit } from '@angular/core';
import { ClassmatesStore } from '../../store/classmates.store';
import { AuthStore } from '../../../../core/auth/auth.store';
import { getSplitPart } from '../../../../shared/utils/split-part';

@Component({
  imports: [],
  selector: 'app-summary-list.page',
  styleUrl: './summary-list.page.scss',
  templateUrl: './summary-list.page.html',
})
export class SummaryListPage implements OnInit{

  private classmatesStore = inject(ClassmatesStore);
  public authStore = inject(AuthStore);

  public classmates = this.classmatesStore.subjectsWithClassmates;
  public totalEnrollments = this.classmatesStore.total;

  ngOnInit(): void {
    this.classmatesStore.loadAll();
  }

   get userName(): string {
      const user = this.authStore.user();
      return user?.firstName ?? getSplitPart(user?.email, '@', 0) ?? 'Usuario';
    }
}
