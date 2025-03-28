import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../../../base.component';

@Component({
  selector: 'app-simple-child',
  imports: [
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

  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleChildComponent extends BaseComponent {
  constructor() {
    super('SimpleChildComponent');
  }
}
