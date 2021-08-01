import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UtilsService } from '@shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;
  private destroy$ = new Subject<any>();
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
