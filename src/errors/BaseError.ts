export class BaseError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// ejemplo: datos requeridos no enviados (como falta de contraseña)
export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}

// ejemplo: usuario no autenticado (login sin token válido)
export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message, 401);
    }
}

// ejemplo: usuario autenticado pero sin permisos (rol incorrecto)
export class ForbiddenError extends BaseError {
    constructor(message: string) {
        super(message, 403);
    }
}

// ejemplo: recurso no encontrado (como admin inexistente)
export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
    }
}

// ejemplo: conflicto de datos (como mail duplicado en base de datos)
export class ConflictError extends BaseError {
    constructor(message: string) {
        super(message, 409);
    }
}

// ejemplo: error inesperado del servidor (para usar en catch generales)
export class InternalServerError extends BaseError {
    constructor(message: string = "Error interno del servidor.") {
        super(message, 500);
    }
}