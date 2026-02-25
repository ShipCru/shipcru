export default function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}
      >
        ShipCru
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#888",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Coming Soon
      </p>
    </div>
  );
}
