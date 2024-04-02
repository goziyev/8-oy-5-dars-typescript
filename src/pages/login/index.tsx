import { useNavigate } from "react-router-dom";
import "./index.css";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/userToken";
const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();

    // nameRef ve emailRef null kontrolü
    if (nameRef.current && passwordRef.current) {
      const user = {
        name: nameRef.current.value,
        password: passwordRef.current.value,
      };

      axios
        .post("https://auth-rg69.onrender.com/api/auth" + "/signin", user)
        .then((el) => {
          if (el.data.id) {
            dispatch(setToken(el.data.accessToken));
            localStorage.setItem("token", el.data.accessToken);
            navigate("/signin");
          }
        })
        .catch((err) => {
          alert(
            "Bunday foydalanuvchi nomi mavjud bo'lishi yoki serverda hatolik bo'lishi mumkin! "
          );
        });
    } else {
      console.error("Ref current is null");
    }
  }

  return (
    <div style={bodyStyle}>
      <div className="Wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" ref={nameRef} required />
            <i className="bx bxs-user" />
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
              Don't have an account?
              <a
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
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
