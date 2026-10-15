import { ImageResponse } from "next/og";

export const alt = "Workload & Labor-Cost Savings Assessment - White Code Labs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#13233A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 0,
              backgroundColor: "#0C74BC",
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            &lt;&gt;
          </div>
          <div
            style={{
              color: "#38bdf8",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            White Code Labs
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            Workload &amp; Labor-Cost Savings Assessment
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#D5DEE7",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Estimate the time and labor-cost value your team could recover by
            improving client onboarding, document collection, and reminder
            follow-ups.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(213, 222, 231, 0.2)",
            paddingTop: 24,
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: 18 }}>
            Interactive Workflow Calculator
          </div>
          <div style={{ color: "#22c55e", fontSize: 18, fontWeight: 600 }}>
            whitecodelabs.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
