
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Raccourcis pour les cas les plus fréquents — évite de répéter le code HTTP
// et le code d'erreur à chaque appel dans les routes.

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super('Données invalides', 400, 'VALIDATION_ERROR', details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Ressource') {
    super(`${resource} introuvable`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non authentifié') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Accès refusé') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: string = 'CONFLICT') {
    super(message, 409, code);
  }
}

// Format de réponse d'erreur uniforme, utilisé par les deux handlers centralisés.
export function formatErrorResponse(error: AppError) {
  return {
    error: {
      message: error.message,
      code: error.code,
      ...(error.details ? { details: error.details } : {}),
    },
  };
}

export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Trop de requêtes, réessayez plus tard') {
    super(message, 429, 'TOO_MANY_REQUESTS');
  }
}
