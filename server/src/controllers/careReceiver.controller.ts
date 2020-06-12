import { RequestHandler, Request, } from "express"
import { CareReceiver } from "../models"

import {
    ICareReceiver,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery
} from "../global"

const postHandler: RequestHandler<any, IResourceResponseBody<ICareReceiver>, IResourceRequestBody<ICareReceiver>> = (req, res, next) => {

}

const getHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<Array<ICareReceiver>>, any, IResourceQuery<ICareReceiver>> = (req, res, next) => {

}

const deleteHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareReceiver>> = (req, res, next) => {

}

const putHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareReceiver>, IResourceRequestBody<Partial<ICareReceiver>>> = (req, res, next) => {

}

export {
    postHandler,
    getHandler,
    deleteHandler,
    putHandler
}