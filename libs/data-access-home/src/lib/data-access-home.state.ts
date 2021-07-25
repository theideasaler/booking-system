import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { DataAccessHomeAction } from './data-access-home.actions';
import { FEATURES } from '@booking-system/models'

export interface DataAccessHomeStateModel {
  items: string[];
}

@State<DataAccessHomeStateModel>({
  name: FEATURES.HOME,
  defaults: {
    items: []
  }
})
@Injectable()
export class DataAccessHomeState {

  @Selector()
  public static getState(state: DataAccessHomeStateModel) {
    return state;
  }

  @Action(DataAccessHomeAction)
  public add(ctx: StateContext<DataAccessHomeStateModel>, { payload }: DataAccessHomeAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
