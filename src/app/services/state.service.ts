import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public valuePlain = 0;
  public readonly valueSubject$$ = new BehaviorSubject(0)
  public readonly valueSignal = signal(0);
  public readonly valueWrapped = {value: 0};

  public incrementPlain() {
    this.valuePlain++;
  }

  public incrementSignal() {
    this.valueSignal.update(value => value + 1);
  }

  public incrementWrapped() {
    this.valueWrapped.value++;
  }

  public incrementSubject() {
    this.valueSubject$$.next(this.valueSubject$$.getValue() + 1);
  }
}
