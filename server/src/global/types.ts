import { Document } from "mongoose"
import { ParamsDictionary } from "express-serve-static-core"
import {
    RTCareGiver, RTCareReceiver, RTSortOrderOpts, RTCareGiverUpdate,
    RTCareReceiverUpdate,
} from "./runtypes"
import { Static } from 'runtypes';

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
    order: TSortOrderOpts
}

// Deriving Type from RunTypes
type TSortOrderOpts = Static<typeof RTSortOrderOpts>

type TCareReceiver = Static<typeof RTCareReceiver>

type TCareGiver = Static<typeof RTCareGiver>

type TCareReceiverUpdate = Static<typeof RTCareReceiverUpdate>

type TCareGiverUpdate = Static<typeof RTCareGiverUpdate>

// Typing Mongoose Models
interface ICareGiver extends Document, TCareGiver { }

interface ICareReceiver extends Document, TCareReceiver { }


export type {
    ICareReceiver,
    ICareGiver,
    TCareReceiver,
    TCareReceiverUpdate,
    TCareGiverUpdate,
    TCareGiver,
    TSortOrderOpts,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery,
}