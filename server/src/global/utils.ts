import { IResourceResponseBody } from "./types";
import { Failure } from "runtypes";

export const constructResourceResponse = <T>(data: T): IResourceResponseBody<T> => {
    return { data }
}

export const constructValidationError = (validationRes: Failure, queryParam?: string): string => {
    return `${validationRes.message}${validationRes.key ? ` for key '${validationRes.key}'` : queryParam ? ` for query parameter '${queryParam}'` : ""}.`
}