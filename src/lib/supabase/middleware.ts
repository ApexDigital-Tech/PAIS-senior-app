import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected routes: redirect to login if not authenticated
    const isDashboardRoute = request.nextUrl.pathname.startsWith("/(dashboard)") ||
        ["/transport", "/health", "/community", "/profile", "/emergency"].some(path =>
            request.nextUrl.pathname.startsWith(path)
        );

    const isAuthRoute = request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/register");

    if (!user && isDashboardRoute) {
        // Check if the current path is truly intended for authenticated users
        // We list explicit paths since route groups like (dashboard) are not visible in the path
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (user && isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return response;
}
