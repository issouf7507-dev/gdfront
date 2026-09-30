import { AppError, formatErrorResponse } from "./app-error";

type Handler<P = Record<string, string>> = (
  req: Request,
  context: { params: Promise<P> },
) => Promise<Response>;

// Enveloppe commune des route handlers : les AppError deviennent une réponse
// { error: { message, code, details? } }, le reste une erreur 500 générique.
export function withErrorHandling<P>(handler: Handler<P>): Handler<P> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof AppError) {
        return Response.json(formatErrorResponse(error), { status: error.statusCode });
      }
      // Ne jamais exposer le message brut (détails internes possibles)
      console.error("Erreur non gérée:", error);
      return Response.json(
        { error: { message: "Erreur interne", code: "INTERNAL_ERROR" } },
        { status: 500 },
      );
    }
  };
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new AppError("Corps de requête invalide", 400, "INVALID_JSON");
  }
}
