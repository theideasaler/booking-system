export enum Features {
  home = 'home',
}

export namespace SearchTypes {
  export function toArray() {
    return [
      {
        name: 'Events',
        value: SearchTypes.events,
        icon: 'skateboarding',
        description: '',
      },
      {
        name: 'Attractions',
        value: SearchTypes.attractions,
        icon: 'attractions',
        description: '',
      },
      {
        name: 'Venues',
        value: SearchTypes.venues,
        icon: 'map',
        description: '',
      },
    ];
  }
}

export enum SearchTypes {
  events = 'events',
  attractions = 'attractions',
  venues = 'venues',
  starred = 'starred',
}

export interface SearchItem {
  name: string;
  description?: string;
  value?: SearchTypes;
  icon?: string;
}

export interface TicketmasterResultModel {
  page: any;
  _embedded: { [key: string]: any[] };
  _links: any;
}

export interface TabsOptions {
  navBgColor?: string;
  navTabTextColor?: string;
  navTabBgColor?: string;
  navIconColor?: string;
  navContentBgColor?: string;
  navContentTextColor?: string;
}
export interface AccordionOptions {
  panelBgColor?: string;
  panelTabTextColor?: string;
  panelTabBgColor?: string;
  panelIconColor?: string;
  panelContentBgColor?: string;
  panelContentTextColor?: string;
}
