enum ErrorTypes {
    DatabaseValidation
}

const errorMessages = {
    [ErrorTypes.DatabaseValidation]: "There was a validation error with your database query!"
}

class ApiError {
    message: string;
    constructor(public name: ErrorTypes, public status = 200) {
        this.message = errorMessages[name];
    }
}


export {
    ApiError, 
    ErrorTypes
}