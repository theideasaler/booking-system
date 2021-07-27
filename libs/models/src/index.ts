export enum Features {
  home = 'home',
}

export namespace SearchTypes {
  export function toArray() {
    return [
      { name: 'Events', value: SearchTypes.events, icon: 'skateboarding' },
      {
        name: 'Attractions',
        value: SearchTypes.attractions,
        icon: 'attractions',
      },
      { name: 'Venues', value: SearchTypes.venues, icon: 'map' },
    ];
  }
}

export enum SearchTypes {
  events = 'events',
  attractions = 'attractions',
  venues = 'venues',
}

export interface SearchItem {
  name: string;
  value: SearchTypes;
  icon?: string;
}

export interface TicketmasterResultModel {
  page: any;
  _embedded: any[];
  links: any;
}

export interface TabsOptions {
    navBgColor?: string;
    navTabTextColor?: string;
    navTabBgColor?: string;
    navIconColor?: string;
    navContentBgColor?: string;
    navContentTextColor?: string;
}