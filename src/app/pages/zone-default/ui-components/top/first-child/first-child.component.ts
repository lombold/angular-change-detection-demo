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
    <div class="component flex-col" [ngClass]="getClasses()">
      <span class="badge">{{ counter }}</span>
      <div class="line"></div>
      <div class="flex-row flex-justify-between flex-align-center">
        <div>
          {{ getComponentName() }}
        </div>
        <div class="button-list">
          <button type="button" (click)="log()" class="secondary">Update</button>
          <button type="button" (click)="toggleInterval()">{{ intervalId ? 'Stop' : 'Start' }} Interval</button>
        </div>
      </div>
    </div>
    <div class="container">
      <app-first-child-a/>
      <app-first-child-b [counter]="counter"/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
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
