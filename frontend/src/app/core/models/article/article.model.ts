import { ArticleDetails } from "./article.details.model";

export interface Article {
    id : string,
    url : string,
    title : string,
    subtitle : any,
    text: string,
    tags : string[],
    imageUrl : string,
    coverImageDescription : string,
    details : ArticleDetails,
}