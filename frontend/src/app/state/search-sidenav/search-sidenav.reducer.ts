import { createReducer, on } from '@ngrx/store';
import { setSearchSidenavOpen, setSearchText } from './search-sidenav.actions';

export const initialState: { open: boolean; text: string } = {
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
