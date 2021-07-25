import { FEATURES } from '@booking-system/models';

const key = FEATURES.HOME;

export class DataAccessHomeAction {
  public static readonly type = `[${key}] Add item`;
  constructor(public payload: string) { }
}