import { RequestHandler, Request, } from "express"
import { CareGiver, CareReceiver } from "../models"

import {
    ICareGiver,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery
} from "../global"

const postHandler: RequestHandler<any, IResourceResponseBody<ICareGiver>, IResourceRequestBody<ICareGiver>> = (req, res, next) => {
}

const getHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<Array<ICareGiver>>, any, IResourceQuery<ICareGiver>> = (req, res, next) => {

}

const deleteHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareGiver>> = (req, res, next) => {

}

const putHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareGiver>, IResourceRequestBody<Partial<ICareGiver>>> = (req, res, next) => {
    
}

export {
    postHandler,
    getHandler,
    deleteHandler,
    putHandler
}