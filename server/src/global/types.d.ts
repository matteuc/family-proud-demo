import {Document} from "mongoose"
import { ParamsDictionary } from "express-serve-static-core"

interface IResourceRouteParams extends ParamsDictionary {
    id: string
}

interface IResourceResponseBody<T> {
    data: T
}

interface IResourceRequestBody<T> {
    payload: T
}

interface IResourceQuery<T extends Document> {
    sort: keyof T,
    order: 1 | -1
}

interface ICareGiver extends Document {
    firstName: string,
    lastName: string,
    receivers: Array<ICareReceiver>
}

interface ICareReceiver extends Document {
    firstName: string,
    lastName: string,
    givers: Array<ICareGiver>
}

export {
    ICareReceiver,
    ICareGiver,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery
}