import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { append, iif, patch, removeItem } from '@ngxs/store/operators';
import { DataAccessHomeAction } from './data-access-home.actions';
import {
  Features,
  SearchTypes,
  TicketmasterResultModel,
} from '@booking-system/models';
import { DataAccessHomeService } from './data-access-home.service';
import { tap } from 'rxjs/operators';

const initials: DataAccessHomeStateModel = {
  data: [],
  type: SearchTypes.events,
  pageIndex: 0,
  pageSize: 100,
  totalPages: 0,
  totalElements: 0,
  filters: null,
  _links: null,
  starred: [],
};

export interface DataAccessHomeStateModel {
  data: any[];
  type: SearchTypes;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  filters?: any;
  _links?: any;
  starred: any[];
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

  @Selector()
  public static getStarred(state: DataAccessHomeStateModel) {
    return state.starred;
  }

  @Action(DataAccessHomeAction.Search)
  public add(
    ctx: StateContext<DataAccessHomeStateModel>,
    action: DataAccessHomeAction.Search
  ) {
    if (action.type && action.type !== ctx.getState().type) {
      ctx.patchState({
        ...initials,
        type: action.type,
        starred: ctx.getState().starred,
      });
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
        ctx.setState(
          patch({
            pageIndex: pageIndex + 1,
            totalElements: page.totalElements,
            totalPages: page.totalPages,
            data: append<any>(_embedded[type]),
            _links,
          })
        );
      })
    );
  }

  @Action(DataAccessHomeAction.Star)
  public star(
    ctx: StateContext<DataAccessHomeStateModel>,
    action: DataAccessHomeAction.Star
  ) {
    const { item } = action;
    ctx.setState(
      patch({
        starred: iif<any[]>(
          (is) => !is?.some((i) => i.id === item.id),
          append([item]),
          removeItem((i) => i.id === item.id)
        ),
      })
    );
  }

  @Action(DataAccessHomeAction.GetStarred)
  public getStarred(ctx: StateContext<DataAccessHomeStateModel>) {
    const { starred } = ctx.getState();
    ctx.setState(
      patch({
        ...initials,
        data: starred,
        starred,
      })
    );
  }
}
