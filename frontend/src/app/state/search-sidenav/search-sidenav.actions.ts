import { createAction, props } from '@ngrx/store';

export const setSearchSidenavOpen = createAction(
    '[Search SideNav] Set State',
    props<{ state : boolean }>()
)

export const setSearchText = createAction(
    '[Search SideNav] Set Search Text',
    props<{ text : string }>()
)