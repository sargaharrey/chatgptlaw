import React, { useState, useContext } from "react";
import axios from "axios";
import "./SignupPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess, registerFail } from './../actions/actions';
import { connect } from 'react-redux';

const Signup = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5001/register", newUser);
     
      // If failed
    
      if (response.status === 200) {
        dispatch(registerSuccess({ user: response.data.userId, isAuthenticated: true }))
        // Redirect to the home page

        // setUser(response.data.username);
        console.log(response.data);
        // console.log(user);
         window.location.href = "/home";
      }
      // Handle the response from the server here
    } catch (err) {
      dispatch(registerFail('Failed to register'));
      // console.error(err.response.data);
      // Handle any errors that occurred during the request
    }
  };
 

  return (
    <div className="sign-up">
      <div className="signup-intro">
        <a href={"/"}>
          <img src={"/logo.png"} width={100} />
        </a>
        <h1>Get in touch now with awesome chat</h1>
        <img src={"/signup.png"} className={"hero"} />
      </div>
      <div className="signup-details">
        <a href={"/"}>
          <img
            src={"/logo.png"}
            className={"logoMobile"}
            width={100}
            style={{ marginBottom: "30px" }}
          />
        </a>
        <h3>Create Account</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            placeholder={"Full Name"}
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="email"
            placeholder={"Email"}
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            placeholder={"Password"}
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
          <button type="submit" className={"submitBtn"}>
            Submit
          </button>
        </form>
        <p className={"login"}>
          you are a user ,{" "}
          <a href={"/"}>
            <span>login</span>
          </a>
        </p>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  registerSuccess,
  registerFail,
};

export default connect(null,mapDispatchToProps)(Signup);
