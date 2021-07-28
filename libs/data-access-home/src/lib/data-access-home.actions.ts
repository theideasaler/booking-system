import { Features, SearchTypes } from '@booking-system/models';

const key = Features.home;

export namespace DataAccessHomeAction {
  export class Search {
    public static readonly type = `[${key}] Search`;
    constructor(public type?: SearchTypes) {}
  }
  export class Star {
    public static readonly type = `[${key}] Star`;
    constructor(public item: any) {}
  }

  export class GetStarred {
    public static readonly type = `[${key}] Get Starred`;
    constructor() {}
  }
}
