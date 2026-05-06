"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Phone, Calendar, Package, Search, X } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

type Customer = {
  id: string;
  name: string;
  phone: string;
  _count: { appointments: number; packages: number };
  packages: { remainingSessions: number; totalSessions: number }[];
};

export function CustomersClient({ customers }: { customers: Customer[] }) {
  const { t } = useLang();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query.trim())
      )
    : customers;

  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 500 }}>
            {t.customers.title}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: 13, marginTop: 4 }}>
            {customers.length} {customers.length === 1 ? t.customers.subtitle1 : t.customers.subtitle2}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted-foreground)",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.customers.searchPlaceholder}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "9px 36px 9px 36px",
            fontSize: 13.5,
            border: "1px solid var(--border)",
            borderRadius: 10,
            background: "var(--card)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted-foreground)",
              display: "flex",
              alignItems: "center",
              padding: 2,
            }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results count when searching */}
      {query.trim() && (
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 12 }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query.trim()}&rdquo;
        </p>
      )}

      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 0",
          color: "var(--muted-foreground)", fontSize: 14,
        }}>
          <User size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p>{query.trim() ? (t.customers.noResults ?? "No customers match your search.") : t.customers.noCustomers}</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((c) => {
            const activePackages = c.packages.filter((p) => p.remainingSessions > 0);
            const lowSessions = activePackages.some((p) => p.remainingSessions < 2);

            return (
              <Link
                key={c.id}
                href={`/customers/${c.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  transition: "border-color 0.15s",
                  cursor: "pointer",
                }}>
                  {/* Left: avatar + name + phone */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: "var(--primary-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 600, color: "var(--primary)",
                      flexShrink: 0,
                    }}>
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14.5 }}>
                        <HighlightMatch text={c.name} query={query} />
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <Phone size={10} /> <HighlightMatch text={c.phone} query={query} />
                      </div>
                    </div>
                  </div>

                  {/* Right: stats */}
                  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted-foreground)" }}>
                        <Calendar size={11} /> {t.appointments.appointments}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 15, textAlign: "center" }}>
                        {c._count.appointments}
                      </div>
                    </div>

                    {activePackages.length > 0 && (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted-foreground)" }}>
                          <Package size={11} /> {t.customers.sessionsLeft}
                        </div>
                        <div style={{
                          fontWeight: 600, fontSize: 15, textAlign: "center",
                          color: lowSessions ? "#c45c5c" : "var(--foreground)",
                        }}>
                          {activePackages.reduce((sum, p) => sum + p.remainingSessions, 0)}
                        </div>
                      </div>
                    )}

                    <div style={{
                      fontSize: 12, color: "var(--muted-foreground)",
                      padding: "4px 10px", background: "var(--muted)",
                      borderRadius: 20,
                    }}>
                      {t.customers.ViewDetails} →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Highlights the matching portion of text in yellow */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(idx, idx + query.trim().length)}
      </mark>
      {text.slice(idx + query.trim().length)}
    </>
  );
}