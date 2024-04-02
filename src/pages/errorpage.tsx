import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        fontSize: "90px",
        fontWeight: "700",
        letterSpacing: "20px",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      ErrorPage
      <br />
      <p
        onClick={() => {
          navigate("/");
        }}
        style={{
          fontSize: "15px",
          letterSpacing: "normal",
          marginLeft: "auto",
          marginRight: "auto",
          width: "200px",
          background: "blue",
          textAlign: "center",
          padding: "15px",
          cursor: "pointer",
        }}
      >
        Home page
      </p>
    </div>
  );
}

export default ErrorPage;
