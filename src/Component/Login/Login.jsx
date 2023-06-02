import React, { useState } from "react";
import axios from "axios";
import registerImg from "../../images/gaming.ebaf2ffc84f4451d.jpg";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import navImage from "../../images/logo.png";
import { auth } from "../Conf/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import joi from "joi";
export default function Login({ saveUser }) {
  let [user, setUser] = useState({
    email: "",
    password: "",
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
  function forgetPassword() {
    alert("make new account ");
  }
  function validatData() {
    let schema = joi.object({
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{3,9}[0-9]?$/))
        .message({
          "string.pattern.base":
            "Password should have a minimum length of 4 characters, first letter must be capital and At least 1 numeric character ,{firstName}",
        }),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function submitForm(e) {
    e.preventDefault();
    let valid = validatData();
    if (valid.error == null || undefined) {
      setLoadinState(true);
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          setUser((user.email = res._tokenResponse));
          navigator("/home");
          localStorage.setItem(
            "token",
            JSON.stringify(res._tokenResponse.idToken)
          );
          saveUser();
        })
        .catch((err) => {
          return setApiError(err?.message?.split("/")?.[1]?.split(")")?.[0]);
        });

      setLoadinState(false);
    } else {
      setErrorList(valid.error.details);
    }
  }

  return (
    <>
      <div className="login-page d-flex justify-content-center ">
        <div className="container row ">
          <div className="col-md-6 col-sm-12 pe-0">
            <img src={registerImg} className="login-img" alt="" />
          </div>
          <div className="col-md-6  col-sm-12 container login-form">
            <img src={navImage} alt="" className="login-image " />
            <h2>log in to gameover</h2>
            <form
              className="col-md-12 row g-3 justify-content-center"
              onSubmit={submitForm}
            >
              <div className="col-10 ">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                />
                {errorList.map((e) => e.context.label === "email") ? (
                  <div>
                    {errorList.filter(
                      (error) => error.context.label === "email"
                    )[0]?.message ? (
                      <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">
                        {
                          errorList.filter(
                            (error) => error.context.label === "email"
                          )[0]?.message
                        }
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-10">
                <input
                  onChange={addUser}
                  className="w-100"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                />
                {errorList.map(
                  (e) => e.context.label === "password" && e.message !== ""
                ) ? (
                  <div>
                    {errorList.filter(
                      (error) => error.context.label === "password"
                    )[0]?.message ? (
                      <div className="w-100 py-1 px-2 mt-1 mb-0 alert alert-danger text-center">
                        {
                          errorList.filter(
                            (error) => error.context.label === "password"
                          )[0]?.message
                        }
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {apiError !== "" ? (
                <div className="alert alert-danger mt-2 mb-0 col-10 py-1">
                  {apiError}
                </div>
              ) : (
                ""
              )}

              {loadinState ? (
                <span className="loading col-10 mt-1" type="button">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </span>
              ) : (
                <button className="create-account col-10 mt-2" type="submit">
                  login
                </button>
              )}
              <hr className="col-10" />
              <Link className="forget-password mt-0" onClick={forgetPassword}>
                forget password?
              </Link>
              <p className="membership">
                not a member yet?
                <Link to="/register" className="login-link">
                  create new account&gt;
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
