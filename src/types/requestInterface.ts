import type { Request } from 'express';

export interface userPayload {
    id: number
}

declare global {
    namespace Express {
        interface Request {
            user?: userPayload;
        }
    }
}