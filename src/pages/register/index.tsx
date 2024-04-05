import { useNavigate } from "react-router-dom";
import "../login/index.css";
import { useRef } from "react";
import axios from "axios";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleSubmit() {
    if (nameRef.current && emailRef.current && passwordRef.current) {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      axios
        .post("https://auth-rg69.onrender.com/api/auth" + "/signup", user)
        .then((el) => {
          console.log(el);
          if (el.data.message === "User registered successfully!") {
            navigate("/signin");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      console.error("Ref current is null");
    }
  }

  return (
    <div style={bodyStyle}>
      <div className="Wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" ref={nameRef} required />
            <i className="bx bxs-user" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" ref={emailRef} required />
            <i className="bx bxs-lock-alt" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <i className="bx bxs-lock-alt" />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Register
          </button>
          <div className="register-link">
            <p>
              Have an account?{" "}
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const bodyStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: 'url("https://images.alphacoders.com/135/1350899.png") no-repeat',
  backgroundPosition: "center",
  backgroundSize: "cover",
};
export default Register;
