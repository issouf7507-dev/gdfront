import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Vérification rapide (présence du cookie) pour éviter d'afficher l'admin
// aux visiteurs. La vraie vérification de session est faite côté serveur
// dans chaque page, action et route admin (lib/session.ts).
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)", "/admin"],
};
