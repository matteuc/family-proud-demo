import { RequestHandler } from "express"

import { CareGiver } from "../models"
import { ApiError, ErrorTypes } from "../global"
import { Error, Types, } from "mongoose"

import {
    ICareGiver,
    IResourceRouteParams,
    IResourceResponseBody,
    IResourceRequestBody,
    IResourceQuery,
    constructResourceResponse
} from "../global"
import { SortOrderOpts } from "../global/types"

const postHandler: RequestHandler<any, IResourceResponseBody<Array<ICareGiver>>, IResourceRequestBody<ICareGiver>> = (req, res, next) => {
    const newCareGiver = req.body.payload;

    // TODO - If the payload implements the 'ICareGiver' interface...
    if(newCareGiver as ICareGiver) {
        // Create the new CareGiver document
        CareGiver.create(newCareGiver, (err: Error, result: Array<ICareGiver>) => {
            if(err) next(err)

            else res.json(constructResourceResponse(result));
        })

    } 
    // Otherwise, throw an error
    else return next(new ApiError(ErrorTypes.InvalidCreatePayload))
}

const getHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<Array<ICareGiver> | ICareGiver>, any, IResourceQuery<ICareGiver>> = (req, res, next) => {
    const _id = req.params.id;
    const { order, sort } = req.query;

    // If an ID is specified...
    if (_id) {
        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new ApiError(ErrorTypes.InvalidDocumentId))

        else {
            // Query for a specific document
            CareGiver.findById(_id, (err: Error, result: ICareGiver) => {
                // If an error occurs pass it onto the default Express error handler
                if (err) next(err)

                else res.json(constructResourceResponse(result))

            })
        }

    }

    // Otherwise, query for all documents
    else {
        // Set the base query, which will execute regardless of order and sort options
        let baseQuery = CareGiver.find();

        // If order or sort query params are provided...
        if (order || sort) {

            // TODO - Check if the params are valid
            if ((order as SortOrderOpts) && (sort as keyof ICareGiver)) baseQuery = baseQuery.sort({ [sort]: order });

            // Otherwise, return an error back to the user
            else return next(new ApiError(ErrorTypes.InvalidSortParameters))
        }


        baseQuery.exec((err: Error, result: Array<ICareGiver>) => {
            // If an error occurs pass it onto the default Express error handler
            if (err) next(err)

            else res.json(constructResourceResponse(result))

        })
    }
}

const deleteHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareGiver>> = (req, res, next) => {
    const _id = req.params.id;

    // If an ID is specified...
    if (_id) {
        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new ApiError(ErrorTypes.InvalidDocumentId))

        else {
            // Query for a specific document
            CareGiver.findOneAndDelete({ _id }, (err: Error, result) => {
                // If an error occurs pass it onto the default Express error handler
                if (err || !result) next(err)

                else res.json(constructResourceResponse(result));

            })
        }

    }
    // If no ID was provided, throw an error
    else return next(new ApiError(ErrorTypes.DocumentIdNotProvided))
}

const putHandler: RequestHandler<IResourceRouteParams, IResourceResponseBody<ICareGiver>, IResourceRequestBody<Partial<ICareGiver>>> = (req, res, next) => {
    const _id = req.params.id;
    const updates = req.body.payload;

    // If an ID was provided...
    if (_id) {

        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new ApiError(ErrorTypes.InvalidDocumentId))

        else {
            // TODO - Verify the update object is of type Partial<T>
            if (!(updates as Partial<ICareGiver>)) next(new ApiError(ErrorTypes.InvalidUpdatePayload))

            // Update the object
            else {

                CareGiver.findByIdAndUpdate({ _id }, updates, { new: true }, (err: Error, result) => {
                    // If an error occurs pass it onto the default Express error handler
                    if (err || !result) next(err)

                    else res.json(constructResourceResponse(result));
                })

            }


        }


    }

    // If no ID was provided, throw an error
    else return next(new ApiError(ErrorTypes.DocumentIdNotProvided))
}

export {
    postHandler,
    getHandler,
    deleteHandler,
    putHandler
}