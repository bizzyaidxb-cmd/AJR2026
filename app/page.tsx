import { createClient } from "@/lib/supabase/server";

// Scaffold home: confirms the Next app + Supabase (RLS as anon) are wired by
// reading the seeded public cities. Replace with the real app shell later.
export default async function Home() {
  const supabase = await createClient();
  const { data: cities, error } = await supabase
    .from("cities")
    .select("name, tier, states(name)")
    .order("tier", { ascending: true })
    .order("name", { ascending: true });

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px" }}>
      <p
        style={{
          letterSpacing: ".18em",
          textTransform: "uppercase",
          fontSize: 12,
          color: "var(--gold)",
          fontWeight: 600,
        }}
      >
        Amar Jawan Ride · App scaffold
      </p>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "8px 0 4px", color: "var(--sindoor)" }}>
        Backend connected.
      </h1>
      <p style={{ color: "#4a443c", marginBottom: 28 }}>
        Next.js + Supabase are wired. Below are the seeded ride cities, read live
        from the database through RLS (anon).
      </p>

      {error ? (
        <div
          style={{
            background: "#fbeee8",
            border: "1px solid #e7c4b6",
            borderLeft: "4px solid var(--sindoor)",
            borderRadius: 10,
            padding: "16px 18px",
          }}
        >
          <strong>Supabase not reachable.</strong>
          <div style={{ fontSize: 14, color: "#5a4a42", marginTop: 6 }}>
            {error.message}. Check <code>.env.local</code> (URL + anon key).
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 13, color: "#8a7f6c" }}>
            {cities?.length ?? 0} cities · {new Set(cities?.map((c) => (c.states as { name: string } | null)?.name)).size} states
          </div>
          {cities?.map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#fffdf8",
                border: "1px solid #e9dec9",
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 15,
              }}
            >
              <span style={{ fontWeight: 500 }}>{c.name}</span>
              <span style={{ color: "#8a7f6c" }}>
                {(c.states as { name: string } | null)?.name} · Tier {c.tier}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
