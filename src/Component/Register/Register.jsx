import React, { useState } from "react";
import axios from "axios";
import registerImg from "../../images/gaming.ebaf2ffc84f4451d.jpg";
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import joi from "joi";
export default function Register() {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  let [apiError, setApiError] = useState("");
  let [errorList, setErrorList] = useState([]);
  let navigator = useNavigate();
  let [loadinState, setLoadinState] = useState(false);
  
  function addUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitForm(e) {
    e.preventDefault();
    let valid = validatData();
    if (valid.error == null) {
      setLoadinState(true);
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup",
        user
      );
      setLoadinState(false);

      if (data.message === "success") {
        navigator("/login");
      } else {
        setApiError(data.message);
      }
    } else {
      setErrorList(valid.error.details);
      ;
    }
  }


  function validatData() {
    let schema = joi.object({
      first_name: joi.string().required().min(3).max(12).alphanum(),
      last_name: joi.string().required().min(3).max(12).alphanum(),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      age: joi.number().required().min(16).max(60),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{3,9}[0-9]?$/)),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="register-page  d-flex justify-content-center mb-5">
        <div className="container row ">
          <div className="col-md col-sm-12-6 pe-0">
            <img src={registerImg} className="register-img" alt="" />
          </div>
          <div className="col-md-6  col-sm-12 container register-form">
            <h2>create my account!</h2>
            <form className="col-md-12 row g-3" onSubmit={submitForm}>
              <div className="col-6">
                <input
                  onChange={addUser}
                  type="text"
                  className="w-100"
                  id="first_name"
                  name="first_name"
                  placeholder="first name"
                />
              {errorList.map((e) => e.context.label === "first_name") ? (
                  <div>
                    {
                      errorList.filter(
                        (error) => error.context.label === "first_name"
                      )[0]?.message ? <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">{errorList.filter(
                        (error) => error.context.label === "first_name"
                      )[0]?.message}</div> : ''
                    }
                  </div>): ("")}
              </div>
              <div className="col-6">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="last name"
                />
                {errorList.map((e) => e.context.label === "last_name") ? (
                  <div>
                  {
                    errorList.filter(
                      (error) => error.context.label === "last_name"
                    )[0]?.message ? <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">{errorList.filter(
                      (error) => error.context.label === "last_name"
                    )[0]?.message}</div> : ''
                  }
                </div>): ("")}
              </div>
              <div className="col-12">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email address"
                />
                {errorList.map((e) => e.context.label === "email") ? (
                  <div>
                  {
                    errorList.filter(
                      (error) => error.context.label === "email"
                    )[0]?.message ? <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">{errorList.filter(
                      (error) => error.context.label === "email"
                    )[0]?.message}</div> : ''
                  }
                </div>): ("")}
              </div>
              <div className="col-12">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="number"
                  id="age"
                  name="age"
                  placeholder="age"
                />
                {errorList.map((e) => e.context.label === "age") ? (
                  <div>
                  {
                    errorList.filter(
                      (error) => error.context.label === "age"
                    )[0]?.message ? <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">{errorList.filter(
                      (error) => error.context.label === "age"
                    )[0]?.message}</div> : ''
                  }
                </div>): ("")}
              </div>
              <div className="col-12">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                />
                {errorList.map((e) => e.context.label === "password" && e.message !== "") ? (
                  <div>
                  {
                    errorList.filter(
                      (error) => error.context.label === "password"
                    )[0]?.message ? <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">{errorList.filter(
                      (error) => error.context.label === "password"
                    )[0]?.message}</div> : ''
                  }
                </div>): ("")}
              </div>


              {apiError != "" ? (
                <div className="alert alert-danger mt-1 mb-0 text-center">{apiError}</div>
              ) : (
                ""
              )}

              {loadinState ? (
                <span className="loading " type="button">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </span>
              ) : (
                <button className="create-account" type="submit">
                  create account
                </button>
              )}

              <p className="privacy">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">
                  Privacy Policy{" "}
                </a>
                and{" "}
                <a href="https://policies.google.com/terms">
                  Terms of Service{" "}
                </a>{" "}
                apply.
              </p>
              <hr />
            </form>
              <p className="membership">
                Already a member?{" "}
                <Link to="/login" className="login-link">
                  log in>
                </Link>
              </p>
          </div>
        </div>
      </div>
    </>
  );
}
