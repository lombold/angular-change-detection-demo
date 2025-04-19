import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleChildComponent } from './simple-child/simple-child.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { BaseComponent } from '../../../../../../base.component';
import { StateService } from '../../../../../../services/state.service';

@Component({
  selector: 'app-first-child-a',
  imports: [SimpleChildComponent, NgClass, AsyncPipe],
  template: `
    <div class="component flex-col" [ngClass]="getClasses()">
      <div class="line"></div>
      <div class="flex-row flex-justify-between flex-align-center">
        <div>
          {{ getComponentName() }}
        </div>
        <div class="button-list">
          <button type="button" (click)="log()" class="secondary">
            Update
          </button>
        </div>
      </div>
      @if (stateService.showStateInfo()) {
        <div class="button-list">
          <button type="button" (click)="stateService.incrementPlain()">
            Plain++
          </button>
          <button type="button" (click)="stateService.incrementSignal()">
            Signal++
          </button>
          <button type="button" (click)="stateService.incrementWrapped()">
            Wrapped++
          </button>
          <button type="button" (click)="stateService.incrementSubject()">
            Subject++
          </button>
        </div>
        <pre>
          Service Values:
          Plain: {{
            stateService.valuePlain
          }} {{ stateService.showMoreInfo() ? '{{ valuePlain }}' : '' }}
          Signal: {{
            stateService.valueSignal()
          }} {{ stateService.showMoreInfo() ? '{{ valueSignal() }}' : '' }}
          Wrapped: {{
            stateService.valueWrapped.value
          }} {{ stateService.showMoreInfo() ? '{{ valueWrapped.value }}' : '' }}
          Observable: {{
            stateService.valueSubject$$.asObservable() | async
          }} {{ stateService.showMoreInfo() ? '{{ valueSubject$$ | async }}' : '' }}
        </pre
        >
      }
    </div>

    <div class="container">
      <app-simple-child />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstChildAComponent extends BaseComponent {
  constructor(public readonly stateService: StateService) {
    super('FirstChildAComponent');
  }
}
