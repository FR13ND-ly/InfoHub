import { createReducer, on } from '@ngrx/store';
import { setReadProgress } from './read-progress.actions';

export const initialState : number = 0;

export const readProgressReducer = createReducer(
    initialState,

    on(setReadProgress, (state, action) => action.state),
)