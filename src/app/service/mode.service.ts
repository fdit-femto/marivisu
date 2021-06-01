import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Mode} from '../model/mode';
import {ModeEnum} from '../enum/mode-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private mode = new BehaviorSubject(new Mode(ModeEnum.STATIC));
  currentMode = this.mode.asObservable();
  constructor() { }

  changeMode(newMode: Mode): void {
    this.mode.next(newMode);
  }
}
