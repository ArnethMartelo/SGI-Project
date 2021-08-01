import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  private sidebarOpened = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor() {}


  opensidebar(value: boolean): void{
    this.sidebarOpened.next(value);
  }
}
