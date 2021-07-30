import { animate, style } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import {
  DataAccessHomeAction,
  DataAccessHomeState,
} from '@booking-system/data-access-home';
import {
  AccordionOptions,
  SearchItem,
  SearchTypes,
  TabsOptions,
} from '@booking-system/models';
import { Select, Store } from '@ngxs/store';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;
  @Select(DataAccessHomeState.getData) data$!: Observable<any[]>;
  @Select(DataAccessHomeState.getStarred) starred$!: Observable<any[]>;
  @Select(DataAccessHomeState.getType) type$!: Observable<SearchTypes>;
  title = 'bsapp';
  tabsContainerWidth = '30%';
  spacerWidth = '30%';
  navColumn = '30%';
  searchItems: SearchItem[] = SearchTypes.toArray();
  tabsOptions: Partial<TabsOptions> = { navIconColor: 'white' };
  accordionOptions: Partial<AccordionOptions> = {
    panelBgColor: '#e3e3e3',
    panelTabTextColor: 'white',
    panelTabBgColor: '#bd3636',
    panelIconColor: 'white',
    panelContentBgColor: '#fe5657',
    panelContentTextColor: 'white',
  };
  masonryOptions: NgxMasonryOptions = {
    gutter: '.gutter-sizer',
    resize: true,
    initLayout: true,
    columnWidth: '.masonry-item',
    percentPosition: true,
  };
  starred = {
    name: 'Starred',
    value: SearchTypes.starred,
    icon: 'star',
    description: 'This section shows all starred items.',
  };
  defaultDescription =
    'Lorem ipsum dolor sit amet, prima mentitum ad mel, et mazim epicuri duo. Dicunt delicatissimi mel ex. Ad usu ullum dolorum philosophia, vel nostrum perpetua te, an legimus menandri vix. Tota clita definitionem an vim. Natum erant iriure duo eu, ut suas verear ponderum mel, assentior philosophia ad eos. Ei meis nulla vituperatoribus vix. Has dolorum voluptaria ne, et facilisi singulis vulputate pro, at eam convenire consequat. Diam graeco no vis, magna atomorum sea te. Te eos minim alienum liberavisse. Id volutpat convenire qui. Populo omittantur efficiantur has ne, nibh adipisci explicari ea pri. An qui soleat appetere lucilius.';
  searchTypes = SearchTypes;
  navFolded!: boolean;
  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.cd.detectChanges();
  }

  itemsLoaded() {
    console.log('itemsloaded');
    this._refreshLayout();
  }

  private _refreshLayout() {
    if (this.masonry !== undefined) {
      this.masonry.reloadItems();
      this.masonry.layout();
    }
  }

  onSearch($event: SearchTypes) {
    if ($event === SearchTypes.starred)
      this.store.dispatch(new DataAccessHomeAction.GetStarred());
    else this.store.dispatch(new DataAccessHomeAction.Search($event));
  }

  setStared(item: any) {
    this.store.dispatch(new DataAccessHomeAction.Star(item));
  }

  setSpacer($event: any) {
    const { navFolded, contentFolded } = $event;
    if (navFolded || contentFolded)
      setTimeout(() => (this.navFolded = true), 300);
    else this.navFolded = false;
    this.spacerWidth = `calc(${this.tabsContainerWidth} - ${
      navFolded
        ? `${
            this._percentageToNumber(this.tabsContainerWidth) *
              (this._percentageToNumber(this.navColumn) / 100) +
            '%'
          } + 24px + 3rem`
        : `0px`
    } - ${
      contentFolded
        ? `${
            this._percentageToNumber(this.tabsContainerWidth) *
              (1 - this._percentageToNumber(this.navColumn) / 100) +
            '%'
          } + 24px + 3rem`
        : `0px`
    })`;
    setTimeout(() => this._refreshLayout(), 300);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  onScroll() {
    this.store.dispatch(new DataAccessHomeAction.Search());
  }

  filterStarred($event: SearchTypes) {
    this.store.dispatch(new DataAccessHomeAction.GetStarred($event));
    this.cd.detectChanges();
  }

  private _percentageToNumber(percentage: string) {
    return +percentage.replace('%', '');
  }
}
