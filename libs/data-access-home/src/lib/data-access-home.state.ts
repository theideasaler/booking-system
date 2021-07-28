import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { DataAccessHomeAction } from './data-access-home.actions';
import {
  Features,
  SearchTypes,
  TicketmasterResultModel,
} from '@booking-system/models';
import { DataAccessHomeService } from './data-access-home.service';
import { tap } from 'rxjs/operators';

const initials: DataAccessHomeStateModel = {
  data: null,
  type: SearchTypes.events,
  pageIndex: 0,
  pageSize: 100,
  totalPages: 0,
  totalElements: 0,
  filters: null,
  _links: null,
};

export interface DataAccessHomeStateModel {
  data: string[] | null;
  type: SearchTypes;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  filters?: any;
  _links?: any;
}

@State<DataAccessHomeStateModel>({
  name: Features.home,
  defaults: initials,
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
    if (action.type && action.type !== ctx.getState().type) {
      ctx.patchState({ ...initials, type: action.type });
    }

    const {
      pageIndex,
      pageSize,
      filters,
      type: searchType,
      data,
    } = ctx.getState();

    let type = action.type ?? searchType;
    return this.api.getData(type, pageIndex, pageSize).pipe(
      tap((d: TicketmasterResultModel) => {
        const { page, _embedded, _links } = d;
        ctx.patchState({
          pageIndex: pageIndex + 1,
          totalElements: page.totalElements,
          totalPages: page.totalPages,
          data: (data ?? []).concat(_embedded[type]),
          _links,
        });
      })
    );
  }
}
