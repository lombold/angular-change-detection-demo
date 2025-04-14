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
      <nav>
        <a [routerLink]="'zone-onpush'" routerLinkActive="active"
          >Zone With push</a
        >
        <a [routerLink]="'zone-default'" routerLinkActive="active"
          >Zone With default</a
        >
        <a [routerLink]="'zone-triggers'" routerLinkActive="active"
          >Zone Triggers</a
        >
        <div>
          <label for="showInterval">Show Interval: </label>
          <input
            type="checkbox"
            name="showInterval"
            (change)="setShowInterval($event)"
          />
        </div>
        <div>
          <label for="showStateInfo">Show State Info: </label>
          <input
            type="checkbox"
            name="showStateInfo"
            (change)="setStateInfo($event)"
          />
        </div>
        @if (stateService.showStateInfo()) {
          <div>
            <label for="showMoreInfo">Show More: </label>
            <input
              type="checkbox"
              name="showMoreInfo"
              (change)="setMoreInfo($event)"
            />
          </div>
        }
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
