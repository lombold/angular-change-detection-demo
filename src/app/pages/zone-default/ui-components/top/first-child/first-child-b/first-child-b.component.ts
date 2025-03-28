import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from '../../../../../../base.component';
import {SimpleChildComponent} from './simple-child/simple-child.component';
import {StateService} from '../../../../../../services/state.service';

@Component({
  selector: 'app-first-child-b',
  imports: [
    NgClass,
    SimpleChildComponent
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
      @if (stateService.showInterval()) {
        <span class="badge">{{ counter }}</span>
      }
    </div>
    <div class="container">
      <app-simple-child/>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class FirstChildBComponent extends BaseComponent {
  @Input() public counter = 0;

  constructor(public readonly stateService: StateService) {
    super('FirstChildBComponent');
  }
}
