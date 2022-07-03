import { File } from "./file.model";

export interface FilesResponse {
    files : File[],
    noMoreArticles : boolean
}