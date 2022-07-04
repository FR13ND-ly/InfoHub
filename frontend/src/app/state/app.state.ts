import { ActionReducer } from "@ngrx/store";
import { articlesReducer } from "./articles/articles.reducer";
import { loadingReducer } from "./loading/loading.reducer";
import { searchSidenavReducer } from "./search-sidenav/search-sidenav.reducer";
import { userSidenavOpenReducer } from "./user-sidenav-open/user-sidenav-open.reducer";

export interface AppState {
    loading : ActionReducer<boolean>,
    userSidenavOpen : ActionReducer<boolean>,
    searchSidenav : ActionReducer<any>,
    articles : ActionReducer<string[]>,
}

export let appState : AppState = {
    loading : loadingReducer,
    userSidenavOpen : userSidenavOpenReducer,
    searchSidenav : searchSidenavReducer,
    articles : articlesReducer,
}