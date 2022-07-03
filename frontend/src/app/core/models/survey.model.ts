import { Variant } from "./variant.model";

export interface Survey {
    id : number,
    question : string,
    variants : Variant[],
    votes? : number
}