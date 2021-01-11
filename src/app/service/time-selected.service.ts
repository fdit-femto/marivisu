import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeSelected {

  private selectedTime = new BehaviorSubject(Number());
  currentVessels = this.selectedTime.asObservable();

  constructor() {
  }

  changeSelectedTime(selectedTime: number): void {
    this.selectedTime.next(selectedTime);
  }
}
