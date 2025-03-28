import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FirstChildComponent} from './first-child/first-child.component';
import {SecondChildComponent} from './second-child/second-child.component';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'app-top',
  imports: [
    FirstChildComponent,
    SecondChildComponent,
    NgClass
  ],
  template: `
    <div class="component flex-col" [ngClass]="getClasses()">
      <div class="line"></div>
      <div class="flex-row flex-justify-between flex-align-center">
        <div>
          {{ getComponentName() }}
        </div>
        <div class="button-list">
          <button type="button" (click)="log()" class="secondary">Update</button>
        </div>
      </div>
    </div>
    <div class="container">
      <app-first-child/>
      <app-second-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class TopComponent extends BaseComponent {
  constructor() {
    super('TopComponent');
  }
}
