import { IResourceResponseBody } from "./types"

export const constructResourceResponse = <T>(data: T): IResourceResponseBody<T> => {
    return { data }
}