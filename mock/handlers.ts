import { http, HttpResponse } from "msw";

type LoginBody = { email: string; password: string };
type SignUpBody = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

const MOCK_USER = {
  id: "u_1",
  name: "Demo User",
  email: "demo@example.com",
};

function parseCookie(cookieHeader: string | null) {
  const o: Record<string, string> = {};
  if (!cookieHeader) return o;
  cookieHeader.split(";").forEach((p) => {
    const [k, ...v] = p.trim().split("=");
    o[k] = decodeURIComponent(v.join("="));
  });
  return o;
}

export const handlers = [
  http.post("/api/sign-up", async ({ request }) => {
    const body = (await request.json()) as SignUpBody;
    const valid =
      typeof body?.email === "string" &&
      typeof body?.password === "string" &&
      body.password.length > 0;

    if (!valid) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // For demo parity with login: allow only example.com emails
    const ok = body.email.endsWith("@example.com");
    if (!ok) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = "mock-session-" + Math.random().toString(36).slice(2);
    const name =
      `${body.firstName ?? "Demo"} ${body.lastName ?? "User"}`.trim();
    return HttpResponse.json(
      { user: { ...MOCK_USER, name, email: body.email }, session },
      { status: 200 },
    );
  }),
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;
    const valid =
      typeof body?.email === "string" &&
      typeof body?.password === "string" &&
      body.password.length > 0;

    if (!valid) {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    // Simple rule for demo
    const ok = body.email.endsWith("@example.com");
    if (!ok) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // We can't set HttpOnly cookies from a service worker. Return a session token
    // and let the client set a same-site, non-HttpOnly cookie for the POC.
    const session = "mock-session-" + Math.random().toString(36).slice(2);
    return HttpResponse.json(
      { user: { ...MOCK_USER, email: body.email }, session },
      { status: 200 },
    );
  }),

  http.get("/api/me", async ({ request }) => {
    const cookies = parseCookie(request.headers.get("cookie"));
    if (!cookies.session?.startsWith("mock-session-")) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({ user: MOCK_USER }, { status: 200 });
  }),

  http.post("/api/logout", async () => {
    // Client will clear the cookie; this just returns OK.
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];
