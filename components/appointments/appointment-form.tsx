"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { ArrowLeft, Clock, DollarSign, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";

type Service = { id: string; name: string; price: number; duration: number };
type Staff = { id: string; name: string; role: string };

type Props = {
  services: Service[];
  staff: Staff[];
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00",
];

export function AppointmentForm({ services, staff }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [staffId, setStaffId] = useState(staff[0]?.id || "");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("10:00");

  const selectedService = services.find((s) => s.id === serviceId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim()) { setError("Customer name is required"); return; }
    if (!serviceId) { setError("Please select a service"); return; }
    if (!staffId) { setError("Please select a staff member"); return; }

    setLoading(true);
    setError("");

    try {
      const startTime = new Date(`${date}T${time}:00`);
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerPhone, startTime: startTime.toISOString(), serviceId, staffId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create appointment");
      }

      router.push("/appointments");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 680 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Link
          href="/appointments"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", fontSize: 13, textDecoration: "none", marginBottom: 16 }}
        >
          <ArrowLeft size={14} /> Back to appointments
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 500 }}>
          New Appointment
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: 13, marginTop: 4 }}>
          Book a new appointment for a customer
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: 20 }}>
          {/* Customer Info */}
          <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <User size={15} color="var(--primary)" /> Customer Details
            </h2>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, '');
                  
                  if (val.length <= 11){
                    if (val.length >= 2 && !val.startsWith('05')) return;
                    setCustomerPhone(val);
                  }
                 }
                }
                  pattern="05[0-9]{9}"
                  placeholder="e.g. 05xxxxxxxxx"
                  required
                  style={inputStyle}
                
                />
              </div>
            </div>
          </section>

          {/* Service Selection */}
          <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <DollarSign size={15} color="var(--primary)" /> Service
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {services.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setServiceId(svc.id)}
                  style={{
                    padding: "14px 16px",
                    border: `2px solid ${serviceId === svc.id ? "var(--primary)" : "var(--border)"}`,
                    borderRadius: 10,
                    background: serviceId === svc.id ? "var(--primary-light)" : "var(--background)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: 500, fontSize: 13.5, color: serviceId === svc.id ? "var(--primary)" : "var(--foreground)", marginBottom: 4 }}>
                    {svc.name}
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--muted-foreground)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Clock size={11} />{svc.duration} min
                    </span>
                    <span style={{ color: "var(--primary)", fontWeight: 500 }}>${svc.price}</span>
                  </div>
                </button>
              ))}
            </div>
            {services.length === 0 && (
              <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
                No services added yet.{" "}
                <Link href="/services" style={{ color: "var(--primary)" }}>Add services →</Link>
              </p>
            )}
          </section>

          {/* Staff & Time */}
          <section style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Calendar size={15} color="var(--primary)" /> Schedule
            </h2>
            <div style={{ display: "grid", gap: 14 }}>
              {/* Staff */}
              <div>
                <label style={labelStyle}>Assign Staff *</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {staff.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStaffId(s.id)}
                      style={{
                        padding: "8px 14px",
                        border: `2px solid ${staffId === s.id ? "var(--primary)" : "var(--border)"}`,
                        borderRadius: 8,
                        background: staffId === s.id ? "var(--primary-light)" : "var(--background)",
                        cursor: "pointer",
                        fontSize: 13,
                        color: staffId === s.id ? "var(--primary)" : "var(--foreground)",
                        fontWeight: staffId === s.id ? 500 : 400,
                      }}
                    >
                      {s.name}
                      <span style={{ fontSize: 11, color: "var(--muted-foreground)", marginLeft: 6 }}>
                        {s.role}
                      </span>
                    </button>
                  ))}
                </div>
                {staff.length === 0 && (
                  <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
                    No staff added yet.{" "}
                    <Link href="/staff" style={{ color: "var(--primary)" }}>Add staff →</Link>
                  </p>
                )}
              </div>

              {/* Date */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input
                    type="date"
                    value={date}
                    min={format(new Date(), "yyyy-MM-dd")}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Time *</label>
                  <select value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle}>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{formatTime(t)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Summary */}
          {selectedService && (
            <div style={{
              padding: "14px 18px",
              background: "var(--primary-light)",
              border: "1px solid var(--primary)",
              borderRadius: 10,
              fontSize: 13.5,
              color: "var(--primary)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span>
                <strong>{selectedService.name}</strong> · {selectedService.duration} min
                {date && time && ` · ${format(new Date(`${date}T${time}:00`), "MMM d 'at' h:mm a")}`}
              </span>
              <span style={{ fontWeight: 600, fontSize: 16 }}>${selectedService.price}</span>
            </div>
          )}

          {error && (
            <div style={{ padding: "12px 16px", background: "#fde8e8", borderRadius: 8, color: "#a01a1a", fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/appointments"
              style={{ ...btnStyle, background: "var(--muted)", color: "var(--foreground)", textDecoration: "none", textAlign: "center" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !services.length || !staff.length}
              style={{ ...btnStyle, background: "var(--primary)", color: "white", flex: 1, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--muted-foreground)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  background: "var(--background)",
  fontSize: 13.5,
  color: "var(--foreground)",
  outline: "none",
};

const btnStyle: React.CSSProperties = {
  padding: "11px 24px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
};