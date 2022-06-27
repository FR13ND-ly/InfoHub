import { createReducer, on } from '@ngrx/store'
import { addArticle, resetArticles, setArticle } from './articles.actions';

export const initialState : Array<string> = [];

export const articlesReducer = createReducer(
    initialState,

    on(addArticle, (state, action) => [...state, action.url] ),

    on(setArticle, (state, action) => [action.url] ),

    on(resetArticles, (state) => [])
)