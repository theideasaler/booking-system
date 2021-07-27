import { Component } from '@angular/core';
import { DataAccessHomeAction } from '@booking-system/data-access-home';
import { SearchItem, SearchTypes, TabsOptions } from '@booking-system/models';
import { Store } from '@ngxs/store';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bsapp';
  spacerWidth = '30%';
  searchItems: SearchItem[] = SearchTypes.toArray();
  options: Partial<TabsOptions> = { navIconColor: 'white' };
  constructor(private store: Store) {}

  onSearch($event: SearchTypes) {
    this.store.dispatch(new DataAccessHomeAction.Search($event));
  }

  setSpacer($event: any) {
    this.spacerWidth = `calc(${$event})`
  }
}
