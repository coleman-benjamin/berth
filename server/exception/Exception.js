class Exception {
    constructor(message) {
        this.message = message ? message : "It broke";
        try {
            throw new Error();
        } catch (e) {
            this.stack = e.stack;
        }
    }
}

class ResourceNotFoundException extends Exception {
    constructor(message) {
        super();
        this.message = "Resource not found : " + message;
    }
}

exports.Exception = Exception;
exports.ResourceNotFoundException = ResourceNotFoundException;