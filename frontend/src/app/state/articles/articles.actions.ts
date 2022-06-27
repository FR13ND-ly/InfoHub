import { createAction, props } from '@ngrx/store';

export const addArticle = createAction(
    '[Article Page] Add Article',
    props<{ url : string }>()
)

export const setArticle = createAction(
    '[Article Page] Set Article',
    props<{ url : string }>()
)

export const resetArticles = createAction(
    '[Article Page] Reset'
)