import { createReducer, on } from '@ngrx/store';
import { setUserSidenavState } from './user-sidenav-open.actions';

export const initialState : boolean = false;

export const userSidenavOpenReducer = createReducer(
    initialState,

    on(setUserSidenavState, (state, action) => action.state),
)