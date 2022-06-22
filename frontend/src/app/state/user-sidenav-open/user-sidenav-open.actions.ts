import { createAction, props } from '@ngrx/store';

export const setUserSidenavState = createAction(
    '[User SideNav] Set State',
    props<{ state : boolean }>()
)