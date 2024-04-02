import { useNavigate } from "react-router-dom";
import "../login/index.css";
import { useRef } from "react";
import axios from "axios";

const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post("https://auth-rg69.onrender.com/api/auth" + "/signup", user)
      .then((el) => {
        console.log(el.data.message);
        if (el.data.message == "User registered successfully!") {
          navigate("/signin");
        }
      })
      .catch((err) => {
        alert(
          "Bunday foydalanuvchi nomi mavjud bo'lishi yoki serverda hatolik bo'lishi mumkin! "
        );
      });
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
          <button type="submit" className="btn">
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
