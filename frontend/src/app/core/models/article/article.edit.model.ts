import { ArticleDetails } from "./article.details.model";
import { Survey } from "../survey.model";

export interface ArticleEdit {
    id : string,
    url : string,
    title : string,
    subtitle : any,
    text: string,
    tags : string[],
    imageUrl : string,
    framework : boolean,
    restrictComments : boolean,
    hideLikes : boolean,
    hideDate : boolean,
    hideViews : boolean,
    draft : boolean,
    surveys : Survey[],
    coverImage : number,
    coverImageDescription : string,
    details : ArticleDetails,
    aditionalArticles : string[]
}