import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {BaseComponent} from './base.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <main>
      <div class="component flex-col" [ngClass]="getClasses()">
        <div class="flex-row flex-justify-between flex-align-center">
          <div>
            {{ getComponentName() }}
          </div>
          <div class="button-list">
            <button type="button" (click)="log()" class="secondary">Update</button>
          </div>
        </div>
      </div>
      <nav>
        <a [routerLink]="'zone-onpush'" routerLinkActive="active">Zone With push</a>
        <a [routerLink]="'zone-default'" routerLinkActive="active">Zone With default</a>
      </nav>
      <div class="container">
        <router-outlet/>
      </div>
    </main>
  `,
  styles: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent {
  constructor() {
    super('AppComponent');
  }
}
