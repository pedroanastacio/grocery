import { MainError } from "./MainError";

export class DuplicateResourceException extends MainError {
    constructor(message: any) {
        super(message);
        this.statusCode = 409;
    }

    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message       
        }
    }
}