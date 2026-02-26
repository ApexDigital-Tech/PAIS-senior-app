import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    // if "next" is in search params, use it as the redirection URL
    const next = searchParams.get("next") ?? "/dashboard";
    const supabase = await createClient();

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    } else if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type: type as any,
            token_hash,
        });
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // fallback to login page with an error parameter instead of a non-existent 404 page
    return NextResponse.redirect(`${origin}/login?error=El+enlace+es+inválido+o+ha+expirado.+Por+favor,+intenta+de+nuevo.`);
}
