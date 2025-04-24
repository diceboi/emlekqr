"use client"

import LoginFormNoRedirect from "./LoginFormNoRedirect"
import RegisterFormNoRedirect from "./RegisterFormNoRedirect"
import { Context } from "../Context";
import { useContext, useEffect } from "react";

export default function AuthNoRedirect({ setAuthenticated }) {
    useEffect(() => {
      setForm("login");
    }, []);
  
    const { form, setForm } = useContext(Context);
  
    return (
      <>
        {form === "login" ? (
          <LoginFormNoRedirect setAuthenticated={setAuthenticated} title={"A mentéshez előrször jelentkezz be, vagy regisztrálj"} />
        ) : (
          <RegisterFormNoRedirect setAuthenticated={setAuthenticated} title={"A mentéshez előrször jelentkezz be, vagy regisztrálj"} />
        )}
      </>
    );
  }
  
