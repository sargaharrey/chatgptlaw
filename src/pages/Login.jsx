import React, { useState, useContext } from "react";
import axios from "axios";
import "./SignupPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFail } from './../actions/actions';
import { connect } from 'react-redux';

import { useNavigate } from 'react-router-dom';


const Login = ({user}) => {
  const user1 = useSelector(state => state.user);
  const navigate = useNavigate();

  console.log(user1)
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user);  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5001/login", newUser);

      if (response.status === 200) {
        // Redirect to the home page
      
        // setUser(response.data.username);
        console.log(response.data)
        dispatch(loginSuccess({ user: response.data.userId, isAuthenticated :true}))
      
        navigate('/Home');
      }
      // Handle the response from the server here
    } catch (err) {
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
        <h1>login to chat</h1>
        <img src={"/login.png"} className={"hero"} />
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
          you are not a user ,
          <a href={"/signup"}>
            <span>register</span>
          </a>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = {
  loginSuccess, 
  loginFail
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);
