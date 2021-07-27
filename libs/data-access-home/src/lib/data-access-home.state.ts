import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { DataAccessHomeAction } from './data-access-home.actions';
import { Features, TicketmasterResultModel } from '@booking-system/models';
import { DataAccessHomeService } from './data-access-home.service';
import { tap } from 'rxjs/operators';

export interface DataAccessHomeStateModel {
  data: string[] | null;
  type: string | null;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  _links?: any;
}

@State<DataAccessHomeStateModel>({
  name: Features.home,
  defaults: {
    data: null,
    type: null,
    pageIndex: 0,
    pageSize: 100,
    totalPages: 0,
    totalElements: 0,
    _links: null,
  },
})
@Injectable()
export class DataAccessHomeState {
  constructor(private api: DataAccessHomeService) {}

  @Selector()
  public static getData(state: DataAccessHomeStateModel) {
    return state.data;
  }

  @Action(DataAccessHomeAction.Search)
  public add(
    ctx: StateContext<DataAccessHomeStateModel>,
    action: DataAccessHomeAction.Search
  ) {
    const { pageIndex, pageSize } = ctx.getState();
    const { type } = action;
    ctx.patchState({ data: null });
    return this.api.getData(type, pageIndex, pageSize).pipe(
      tap((d: TicketmasterResultModel) => {
        const { page, _embedded, _links } = d;
        ctx.patchState({
          totalElements: page.totalElements,
          totalPages: page.totalPages,
          data: _embedded[type],
          _links,
        });
      })
    );
  }
}
