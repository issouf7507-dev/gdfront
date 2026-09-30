import { readJson, withErrorHandling } from "@/lib/api-handler";
import { clientIp, createQuoteRequest } from "@/lib/quotes";
import { parseQuoteRequest } from "@/lib/validation/quote";

export const POST = withErrorHandling(async (req) => {
  const input = parseQuoteRequest(await readJson(req));

  // Honeypot rempli : on répond comme un succès sans rien enregistrer
  if (input.website) {
    return Response.json({ data: { id: null } }, { status: 201 });
  }

  const quote = await createQuoteRequest(input, clientIp(req));
  return Response.json({ data: { id: quote.id } }, { status: 201 });
});
