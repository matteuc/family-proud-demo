import {Document} from "mongoose"
import { ParamsDictionary } from "express-serve-static-core"

// Typing Request Handler Params, Response Body, Request Body, and Query
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
    order: SortOrderOpts
}

// Typing Mongoose Models
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

type SortOrderOpts = 1 | -1 | "asc" | "desc" | "ascending" | "descending"

export {
    ICareReceiver,
    ICareGiver,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery,
    SortOrderOpts
}