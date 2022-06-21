import { createAction, props } from '@ngrx/store';

export const getState = createAction(
    '[Loading Bar] Get State'
)

export const setState = createAction(
    '[Loading Bar] Set State',
    props<{ state : boolean }>()
)