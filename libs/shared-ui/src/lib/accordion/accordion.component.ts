import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { AccordionOptions, SearchTypes } from '@booking-system/models';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
import { camcelToHyphen } from '@booking-system/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bs-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, OnDestroy {
  @ContentChildren(AccordionPanelComponent)
  panels!: QueryList<AccordionPanelComponent>;
  @Output() selectChange = new EventEmitter<SearchTypes>();
  @Input() options!: Partial<AccordionOptions>;
  smallScreen: boolean = false;
  destroy$ = new Subject();
  private iniialized!: boolean;
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    this.options = { ...(this.options ?? {}) };
    this._setOptions();
  }

  ngAfterContentInit() {
    this.activatePanel(
      this.panels
        .toArray()
        .filter((p) => !!p)
        .find((p) => p.active === true)
    );
    this.panels.forEach((panel) => {
      panel.togglePanel
        .pipe(takeUntil(this.destroy$))
        .subscribe((p) => this.activatePanel(p));
    });
    this.iniialized = true;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  activatePanel(panel: AccordionPanelComponent | undefined) {
    if (!panel) return;
    
    if (!panel.active) {
      this.panels.toArray().forEach((panel) => (panel.active = false));
      panel.active = true;
      this.selectChange.emit(panel.item?.value);
    } else {
      this.panels.toArray().forEach((panel) => (panel.active = false));
      this.selectChange.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.smallScreen = $event.target.innerWidth < 768;
  }

  private _setOptions() {
    const options: any = this.options ?? {};
    Object.keys(options ?? {}).forEach((key) => {
      if (options[key])
        this.eleRef.nativeElement.style.setProperty(
          `--${camcelToHyphen(key)}`,
          options[key]
        );
    });
  }
}
