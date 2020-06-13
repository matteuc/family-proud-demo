import { RequestHandler } from "express"

import { CareGiver } from "../models"
import { Error, Types } from "mongoose"

import {
    GlobalTypes,
    GlobalErrors,
    RunTypes,
    Utils
} from "../global"
import { RTCareGiverUpdate } from "../global/runtypes"

const postHandler: RequestHandler<
    any,
    GlobalTypes.IResourceResponseBody<Array<GlobalTypes.TCareGiver>>,
    GlobalTypes.IResourceRequestBody<GlobalTypes.TCareGiver>
> = (req, res, next) => {
    const newCareGiver = req.body.payload;

    // If the payload conforms to the RTCareGiver type...
    const rtValidation = RunTypes.RTCareGiver.validate(newCareGiver);
    if (rtValidation.success) {
        // Create the new CareGiver document
        CareGiver.create(
            newCareGiver,
            (err: Error, result: Array<GlobalTypes.ICareGiver>
            ) => {
                if (err) next(err)

                else res.json(Utils.constructResourceResponse(result));
            })

    }
    // Otherwise, throw an error
    else return next(new GlobalErrors.ApiError(
        GlobalErrors.ErrorTypes.InvalidCreatePayload,
        Utils.constructValidationError(rtValidation)
    ))
}

const getHandler: RequestHandler<
    GlobalTypes.IResourceRouteParams,
    GlobalTypes.IResourceResponseBody<
        Array<GlobalTypes.TCareGiver> | GlobalTypes.ICareGiver
    >,
    any,
    GlobalTypes.IResourceQuery<GlobalTypes.ICareGiver>
> = (req, res, next) => {
    const _id = req.params.id;
    const { order, sort } = req.query;

    // If an ID is specified...
    if (_id) {
        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.InvalidDocumentId))

        else {
            // Query for a specific document
            CareGiver.findById(_id, (err: Error, result: GlobalTypes.ICareGiver) => {
                // If an error occurs pass it onto the default Express error handler
                if (err) next(err)

                else res.json(Utils.constructResourceResponse(result))

            })
        }

    }

    // Otherwise, query for all documents
    else {
        // Set the base query, which will execute regardless of order and sort options
        let baseQuery = CareGiver.find();

        // If order or sort query params are provided...
        if (order || sort) {
            // Check if the params are valid
            const rtValidationOrder = RunTypes.RTSortOrderOpts.validate(order)
            const rtValidationSort = RunTypes.RTCareGiverSortOpts.validate(sort)

            if (rtValidationOrder.success && rtValidationSort.success) baseQuery = baseQuery.sort({ [sort]: order });

            // Otherwise, return an error back to the user
            else {
                const errorMessages = []

                if (!rtValidationOrder.success) errorMessages.push(Utils.constructValidationError(rtValidationOrder, "order"))
                if (!rtValidationSort.success) errorMessages.push(Utils.constructValidationError(rtValidationSort, "sort"))

                return next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.InvalidSortParameters, ...errorMessages))
            }
        }

        baseQuery.exec((err: Error, result: Array<GlobalTypes.TCareGiver>) => {
            // If an error occurs pass it onto the default Express error handler
            if (err) next(err)

            else res.json(Utils.constructResourceResponse(result))

        })
    }
}

const deleteHandler: RequestHandler<
    GlobalTypes.IResourceRouteParams,
    GlobalTypes.IResourceResponseBody<GlobalTypes.ICareGiver>
> = (req, res, next) => {
    const _id = req.params.id;

    // If an ID is specified...
    if (_id) {
        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.InvalidDocumentId))

        else {
            // Query for a specific document
            CareGiver.findOneAndDelete({ _id }, (err: Error, result) => {
                // If an error occurs pass it onto the default Express error handler
                if (err || !result) next(err)

                else res.json(Utils.constructResourceResponse(result));

            })
        }

    }
    // If no ID was provided, throw an error
    else return next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.DocumentIdNotProvided))
}

const putHandler: RequestHandler<
    GlobalTypes.IResourceRouteParams,
    GlobalTypes.IResourceResponseBody<GlobalTypes.ICareGiver>,
    GlobalTypes.IResourceRequestBody<Partial<GlobalTypes.ICareGiver>>
> = (req, res, next) => {
    const _id = req.params.id;
    const updates = req.body.payload;

    // If an ID was provided...
    if (_id) {

        // Verify the specified ID is a valid ObjectID
        if (!Types.ObjectId.isValid(_id)) next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.InvalidDocumentId))

        else {
            // Verify the update object is of type Partial<T>
            const rtValidation = RTCareGiverUpdate.validate(updates)
            if (!rtValidation.success) {
                next(new GlobalErrors.ApiError(
                    GlobalErrors.ErrorTypes.InvalidUpdatePayload,
                    Utils.constructValidationError(rtValidation)
                ))
            }

            // Update the object
            else {

                CareGiver.findByIdAndUpdate({ _id }, updates, { new: true }, (err: Error, result) => {
                    // If an error occurs pass it onto the default Express error handler
                    if (err || !result) next(err)

                    else res.json(Utils.constructResourceResponse(result));
                })

            }


        }


    }

    // If no ID was provided, throw an error
    else return next(new GlobalErrors.ApiError(GlobalErrors.ErrorTypes.DocumentIdNotProvided))
}

export {
    postHandler,
    getHandler,
    deleteHandler,
    putHandler
}