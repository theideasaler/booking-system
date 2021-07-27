import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { DataAccessHomeAction } from './data-access-home.actions';
import { Features } from '@booking-system/models'
import { DataAccessHomeService } from './data-access-home.service';
import { tap } from 'rxjs/operators';

export interface DataAccessHomeStateModel {
  result: string[];
  type: string | null;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

@State<DataAccessHomeStateModel>({
  name: Features.home,
  defaults: {
    result: [],
    type: null,
    pageIndex: 0,
    pageSize: 100,
    totalPages: 0,
    totalCount: 0,
  }
})
@Injectable()
export class DataAccessHomeState {
  constructor(private api: DataAccessHomeService) {}

  @Selector()
  public static getState(state: DataAccessHomeStateModel) {
    return state;
  }

  @Action(DataAccessHomeAction.Search)
  public add(ctx: StateContext<DataAccessHomeStateModel>, action: DataAccessHomeAction.Search) {
    const { pageIndex, pageSize } = ctx.getState();
    const { type } = action;
    return this.api.getData(type, pageIndex, pageSize).pipe(tap(d => {
      d
    }))
  }
}
