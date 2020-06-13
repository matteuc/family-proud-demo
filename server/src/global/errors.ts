import { Http2ServerRequest } from "http2";

enum ErrorTypes {
    InvalidDocumentId = "InvalidDocumentId",
    InvalidSortParameters = "InvalidSortParameters",
    InvalidCreatePayload = "InvalidCreatePayload",
    InvalidUpdatePayload = "InvalidUpdatePayload",
    DocumentIdNotProvided = "DocumentIdNotProvided",

}

interface ErrorInfo {
    [key: string]: {
        message: string,
        status: number
    }
}

const errorMapping: ErrorInfo = {
    [ErrorTypes.InvalidDocumentId]: {
        message: "The specified document id is not valid.",
        status: 400
    },
    [ErrorTypes.InvalidSortParameters]: {
        message: "The specified sort or order parameters are not valid.",
        status: 400
    },
    [ErrorTypes.InvalidCreatePayload]: {
        message: "The data sent in the payload is invalid and cannot be used to create the specified document.",
        status: 400
    },
    [ErrorTypes.InvalidUpdatePayload]: {
        message: "The update payload is invalid for the specified document.",
        status: 400
    },
    [ErrorTypes.DocumentIdNotProvided]: {
        message: "No document ID was specified.",
        status: 400
    },
}

class ApiError extends Error {
    message: string;
    status: number;
    constructor(public name: ErrorTypes) {
        super(errorMapping[name].message);

        this.message = errorMapping[name].message;
        this.status = errorMapping[name].status;
    }
}

export {
    ApiError,
    ErrorTypes
}