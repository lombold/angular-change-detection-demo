import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-zone-triggers',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="run-outside-angular">
      <p class="label">Zone Triggers</p>
      <div class="component flex-col blink-once-a" #flashingDiv>
        <div class="flex-row flex-justify-between flex-align-center">
          <h3>This Flashes when Zone triggers change detection</h3>
        </div>
      </div>
      <h2>Ways to trigger Application Ticks</h2>
      <div class="flex-row">
        <div class="box flex-col">
          <h3>DOM Events</h3>
          <button type="button" (click)="log('Clicked!')">Click!</button>
        </div>

        <div class="box flex-col">
          <h3>Timeouts / Intervals</h3>
          <div>Delay (s): <input type="number" #intervalInput value="1" /></div>
          <button type="button" (click)="startInterval(intervalInput.value)">
            {{ timeoutId ? 'Stop Interval' : 'Start Interval' }}
          </button>
        </div>

        <div class="box flex-col">
          <h3>Promises / HttpRequests</h3>
          <button type="button" (click)="sendRequest()">
            Send Request (3s)
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [],
  styles: [
    `
      .run-outside-angular {
        margin: 0;
        background-color: lightyellow;
        padding: 2rem;
        border: orange 6px dotted;
        white-space-collapse: preserve-breaks;
        position: relative;

        > .label {
          position: absolute;
          top: 0;
          left: 0;
          background-color: lightgoldenrodyellow;
          padding: 0.5rem;
          z-index: 1;
          border: 1px solid orange;
          margin: 0;
        }
      }

      .box {
        margin: 0 1rem 1rem 1rem;
        padding: 1rem;
        background-color: lightgray;
      }
    `,
  ],
})
export class ZoneTriggersComponent implements OnInit, OnDestroy {
  private readonly flashingDiv =
    viewChild<ElementRef<HTMLDivElement>>('flashingDiv');

  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.setupZoneChangeMonitor();
  }

  ngOnDestroy() {}

  setupZoneChangeMonitor() {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.onMicrotaskEmpty
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.flashingDiv()?.nativeElement.classList.toggle('blink-once-a');
          this.flashingDiv()?.nativeElement.classList.toggle('blink-once-b');
          this.log('Microtask completed');
        });
    });
  }

  log(text: string) {
    console.log(text);
  }

  // Different Zone triggers

  // 1. setTimeout / setInterval
  protected timeoutId: any;

  startInterval(value: string) {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
      this.timeoutId = null;
      return;
    }
    this.timeoutId = setInterval(
      () => {
        this.log('Interval triggered');
      },
      1000 * Number(value),
    );
  }

  // 2. Promise / HttpClient
  async sendRequest() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // 9. Custom events? nah
  //
}
