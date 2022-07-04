import { ArticlePreview } from "./article/article.preview.model";

export interface ReadList {
    id : any,
    name : string,
    lastPreview : string,
    preview : ArticlePreview[],
    icon : string,
    length : number
}