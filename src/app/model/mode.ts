import {ModeEnum} from '../enum/mode-enum.enum';

export class Mode {
  // tslint:disable-next-line:variable-name
  private _value: ModeEnum;

  constructor(mode: ModeEnum) {
    this._value = mode;
  }

  get value(): ModeEnum {
    return this._value;
  }

  set value(value: ModeEnum) {
    this._value = value;
  }
}
