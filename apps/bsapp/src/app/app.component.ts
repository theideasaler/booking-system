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
  title = 'bsapp';
  spacerWidth = '30%';
  searchItems: SearchItem[] = SearchTypes.toArray();
  options: Partial<TabsOptions> = { navIconColor: 'white' };
  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    fitWidth: true
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

  setSpacer($event: any) {
    this.spacerWidth = `calc(${$event})`;
    setTimeout(() => this._refreshLayout(), 300)
  }

  goToLink(url: string){
    window.open(url, "_blank");
}
}
