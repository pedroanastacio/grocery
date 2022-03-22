import { MainError } from './MainError';

export class ForbiddenException extends MainError {
    constructor(message: any) {
        super(message);
        this.statusCode = 403;
    }

    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message
        }
    }
}