export default function FranchiseLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FEFCF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Loading franchise page"
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid #E8D4BE",
          borderTopColor: "#E87722",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
