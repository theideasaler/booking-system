import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { SearchTypes, TabsOptions } from '@booking-system/models';
import { SideTabComponent } from './side-tab/side-tab.component';

@Component({
  selector: 'bs-side-tabs',
  templateUrl: './side-tabs.component.html',
  styleUrls: ['./side-tabs.component.scss'],
})
export class SideTabsComponent implements OnInit, AfterContentInit {
  @Input() fullHeight!: boolean;
  @Input() foldable!: boolean;
  @Input() relativeWidth!: string;
  @Input() options!: Partial<TabsOptions>;
  @Output() selectChange = new EventEmitter<SearchTypes>();
  @Output() onFold = new EventEmitter<string>();
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
  folded = false;
  contentFolded = false;
  contentFoldedSm = false;
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    if (this.fullHeight)
      this.eleRef.nativeElement.style.setProperty('--height', '100%');
    this.options = { ...(this.options ?? {}) };
    this._setOptions();
  }

  ngAfterContentInit() {
    this.activateTab(
      this.tabs
        .toArray()
        .filter((t) => !!t)
        .find((tab) => (tab.active = true))
    );
    this.iniialized = true;
  }

  activateTab(tab: SideTabComponent | undefined) {
    if (!tab) return;
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    tab.active = true;
    this.selectChange.emit(tab.item?.value);
    this.contentFoldedSm = false;
    this.noActiveTab = false;
    this.contentFolded = false;
    this._moveContent();
  }

  onTabsFoldChange() {
    this.folded = !this.folded;
    if (this.folded)
      return this.onFold.emit(
        `${Number(this.relativeWidth) * 100 + '%'} - ${
          Number(this.relativeWidth) * 0.3 * 100 + '%'
        } + 24px + 3rem`
      );
    else return this.onFold.emit(`${Number(this.relativeWidth) * 100 + '%'}`);
  }

  onContentFoldChange() {
    this.contentFolded = !this.contentFolded;
    this._moveContent();
  }

  onCloseClick() {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    this.contentFoldedSm = true;
    this.contentFolded = true;
    this.folded = true;
    this._moveContent();
  }

  private _setOptions() {
    const {
      navBgColor,
      navTabTextColor,
      navTabBgColor,
      navIconColor,
      navContentBgColor,
      navContentTextColor,
    } = this.options ?? {};
    if (navBgColor)
      this.eleRef.nativeElement.style.setProperty('--nav-bg-color', navBgColor);
    if (navTabTextColor)
      this.eleRef.nativeElement.style.setProperty(
        '--nav-tab-text-color',
        navTabTextColor
      );
    if (navTabBgColor)
      this.eleRef.nativeElement.style.setProperty(
        '--nav-tab-bg-color',
        navTabBgColor
      );
    if (navIconColor)
      this.eleRef.nativeElement.style.setProperty(
        '--nav-icon-color',
        navIconColor
      );
    if (navContentBgColor)
      this.eleRef.nativeElement.style.setProperty(
        '--nav-content-bg-color',
        navContentBgColor
      );
    if (navContentTextColor)
      this.eleRef.nativeElement.style.setProperty(
        '--nav-content-text-color',
        navContentTextColor
      );
  }

  private _moveContent() {
    if(!this.iniialized) return;
    if (this.contentFolded)
      return this.onFold.emit(
        `${Number(this.relativeWidth) * 100 + '%'} - ${
          Number(this.relativeWidth) * 0.3 * 100 + '%'
        } + 24px + 3rem - 21% + 24px + 3rem`
      );
    else
      return this.onFold.emit(
        `${Number(this.relativeWidth) * 100 + '%'} - ${
          Number(this.relativeWidth) * 0.3 * 100 + '%'
        } + 24px + 3rem`
      );
  }
}
