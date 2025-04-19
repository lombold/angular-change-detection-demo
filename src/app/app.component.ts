import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseComponent } from './base.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <main>
      <div class="component flex-col" [ngClass]="getClasses()">
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
      </div>
      <nav class="flex-justify-between">
        <div class="flex-row flex-2-3">
          <a [routerLink]="'zone-onpush'" routerLinkActive="active">
            ChangeDetectionStrategy.OnPush
          </a>
          <a [routerLink]="'zone-default'" routerLinkActive="active">
            ChangeDetectionStrategy.Default
          </a>
          <a [routerLink]="'zone-playground'" routerLinkActive="active">
            Zone Playground
          </a>
        </div>
        <div class="flex-row flex-1-3">
          <span><strong>Settings</strong></span>
          <div class="">
            <div>
              <input
                type="checkbox"
                name="showInterval"
                id="showInterval"
                (change)="setShowInterval($event)"
              />
              <label for="showInterval">Show Interval</label>
            </div>
            <div class="flex-row">
              <div>
                <input
                  type="checkbox"
                  name="showStateInfo"
                  id="showStateInfo"
                  (change)="setStateInfo($event)"
                />
                <label
                  for="showStateInfo"
                  title="A service containing a signal, a subject, a plain value and an object containing a value"
                >
                  Values Service
                </label>
              </div>
              @if (stateService.showStateInfo()) {
                <div>
                  <input
                    type="checkbox"
                    name="showMoreInfo"
                    id="showMoreInfo"
                    (change)="setMoreInfo($event)"
                  />
                  <label for="showMoreInfo">Show Binding</label>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
      <div class="router-wrapper">
        <router-outlet />
      </div>
    </main>
  `,
  styles: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent {
  constructor(public readonly stateService: StateService) {
    super('AppComponent');
  }

  setStateInfo($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.stateService.setShowStateInfo(target.checked);
  }

  setMoreInfo($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.stateService.setShowMoreInfo(target.checked);
  }

  setShowInterval($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.stateService.setShowInterval(target.checked);
  }
}
