import { animate, style } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import {
  DataAccessHomeAction,
  DataAccessHomeState,
} from '@booking-system/data-access-home';
import { SearchItem, SearchTypes, TabsOptions } from '@booking-system/models';
import { Select, Store } from '@ngxs/store';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;
  @Select(DataAccessHomeState.getData) data$!: Observable<any[]>;
  @Select(DataAccessHomeState.getStared) stared$!: Observable<any[]>;
  title = 'bsapp';
  tabsContainerWidth = '30%';
  spacerWidth = '30%';
  navColumn = '30%';
  searchItems: SearchItem[] = SearchTypes.toArray();
  options: Partial<TabsOptions> = { navIconColor: 'white' };
  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    fitWidth: true,
  };
  constructor(private store: Store) {}

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
    this.store.dispatch(new DataAccessHomeAction.Search($event));
  }

  setStared(item: any) {
    this.store.dispatch(new DataAccessHomeAction.Star(item));
  }

  setSpacer($event: any) {
    const { navFolded, contentFolded } = $event;
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

  private _percentageToNumber(percentage: string) {
    return +percentage.replace('%', '');
  }
}
