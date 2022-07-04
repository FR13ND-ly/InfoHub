import { Article } from "./article.model";

export interface ArticlesResponse {
    articles : Article[],
    noMoreArticles : boolean
}