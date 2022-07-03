export interface Widget {
    text : string,
    link? : string,
    imageId? : string,
    imageUrl : string,
    author? : string,
    activated: boolean,
    revealed?: boolean
}