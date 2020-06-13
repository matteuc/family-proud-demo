import { Request, Response, NextFunction } from "express-serve-static-core";
import { GlobalErrors } from "../global";
import { ErrorRequestHandler } from "express";

const jsonErrorHandler: ErrorRequestHandler = (err: GlobalErrors.ApiError, req: Request, res: Response, next: NextFunction): any => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"

    res
        .status(status)
        .json({
            error: err,
            message,
            name: err.name
        })
}

export default jsonErrorHandler