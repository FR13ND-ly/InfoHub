import { createAction, props } from '@ngrx/store';

export const setReadProgress = createAction(
    '[ReadProgress Bar] Set State',
    props<{ state : number }>()
)