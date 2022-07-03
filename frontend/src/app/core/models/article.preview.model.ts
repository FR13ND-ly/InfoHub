import { ArticleDetails } from "./article.details.model";

export interface ArticlePreview {
    url : string,
    title : string,
    text : string,
    details? : ArticleDetails,
    imageUrl : string,
    opened? : boolean
}