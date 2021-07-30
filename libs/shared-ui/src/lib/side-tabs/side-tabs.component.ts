import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { SearchTypes, TabsOptions } from '@booking-system/models';
import { SideTabComponent } from './side-tab/side-tab.component';
import { camcelToHyphen } from '@booking-system/utils';

@Component({
  selector: 'bs-side-tabs',
  templateUrl: './side-tabs.component.html',
  styleUrls: ['./side-tabs.component.scss'],
})
export class SideTabsComponent implements OnInit, AfterContentInit {
  @Input() fullHeight!: boolean;
  @Input() foldable!: boolean;
  @Input() tabsColumn!: string;
  @Input() options!: Partial<TabsOptions>;
  @Output() selectChange = new EventEmitter<SearchTypes>();
  @Output() foldChange = new EventEmitter<{
    navFolded: boolean;
    contentFolded: boolean;
  }>();
  @ContentChildren(SideTabComponent) tabs!: QueryList<SideTabComponent>;
  private iniialized!: boolean;
  private _noActiveTab!: boolean;
  set noActiveTab(v: boolean) {
    this._noActiveTab = v;
  }
  get noActiveTab() {
    let v = false;
    if (this.tabs) {
      this.tabs.toArray().forEach((tab) => (v = v || tab.active));
    }
    this._noActiveTab = !v;
    return this._noActiveTab;
  }
  navFolded = false;
  contentFolded = false;
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    this.options = { ...(this.options ?? {}) };
    this._setOptions();
  }

  ngAfterContentInit() {
    this.activateTab(
      this.tabs
        .toArray()
        .filter((t) => !!t)
        .find((tab) => tab.active === true)
    );
    this.iniialized = true;
  }

  activateTab(tab: SideTabComponent | undefined) {
    if (!tab) return;
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    tab.active = true;
    this.selectChange.emit(tab.item?.value);
    this.navFolded = false;
    this.contentFolded = false;
    this.noActiveTab = false;
    this._updateFoldStatus();
  }

  onTabsFoldChange() {
    this.navFolded = !this.navFolded;
    this._updateFoldStatus();
  }

  onContentFoldChange() {
    this.contentFolded = !this.contentFolded;
    this._updateFoldStatus();
  }

  onCloseClick() {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    this.contentFolded = true;
    this.navFolded = true;
    this._updateFoldStatus();
  }

  private _setOptions() {
    const options: any = this.options ?? {};

    this.eleRef.nativeElement.style.setProperty(
      '--height',
      this.fullHeight ? '100%' : 'auto'
    );
    this.eleRef.nativeElement.style.setProperty(
      '--tabs-column-width',
      this.tabsColumn ?? '30%'
    );
    Object.keys(options ?? {}).forEach((key) => {
      if (options[key])
        this.eleRef.nativeElement.style.setProperty(
          `--${camcelToHyphen(key)}`,
          options[key]
        );
    });
  }

  private _updateFoldStatus() {
    if (!this.iniialized) return;
    this.foldChange.emit({
      navFolded: this.navFolded,
      contentFolded: this.contentFolded,
    });
  }
}
