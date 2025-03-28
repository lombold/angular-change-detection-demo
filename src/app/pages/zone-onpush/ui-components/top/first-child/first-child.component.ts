import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FirstChildAComponent} from './first-child-a/first-child-a.component';
import {FirstChildBComponent} from './first-child-b/first-child-b.component';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../base.component';

@Component({
  selector: 'app-first-child',
  imports: [
    FirstChildAComponent,
    FirstChildBComponent,
    NgClass
  ],
  template: `
    <div class="component" [ngClass]="getClasses()">
      <div class="line"></div>
      {{ getComponentName() }}
      <button type="button" (click)="log()">Update</button>
      <button type="button" (click)="toggleInterval()">{{ intervalId ? 'Stop' : 'Start' }} Interval</button>
      {{ counter }}
    </div>
    <div class="container">
      <app-first-child-a/>
      <app-first-child-b [counter]="counter"/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstChildComponent extends BaseComponent {
  public counter = 0;
  public intervalId?: number;

  constructor(private readonly cd: ChangeDetectorRef) {
    super('FirstChildComponent');
  }


  toggleInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    } else {
      this.intervalId = setInterval(() => {
        this.counter++;
        console.log('Interval', this.counter);
        this.cd.markForCheck();
      }, 1000);
    }
  }
}
