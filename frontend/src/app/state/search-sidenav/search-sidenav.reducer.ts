import { createReducer, on } from '@ngrx/store';
import { setSearchSidenavOpen, setSearchText } from './search-sidenav.actions';

export interface searchSidenav {
  open : boolean,
  text : string
} 

export const initialState: searchSidenav = {
  open: false,
  text: '',
};

export const searchSidenavReducer = createReducer(
  initialState,

  on(setSearchSidenavOpen, (state, action) => ({
    ...state,
    ...{ 
        open: action.state,
        text: '' 
    },
  })),

  on(setSearchText, (state, action) => ({
    ...state,
    ...{ text: action.text, open: true },
  }))
);
