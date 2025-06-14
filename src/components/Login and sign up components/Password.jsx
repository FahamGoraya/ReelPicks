import { useState } from "react";
import "../../pages/Login.css";

function Password(props) {
  const handle_Pass = (event) => {
    props.SetPassword(event.target.value);
    props.setError(""); // Reset error message
  };

  return (
    <>
      <h4 className="SignupHeading">Password : </h4>
      <input
        type="password"
        className="SignupText"
        value={props.pass}
        onChange={handle_Pass}
        required
      />
    </>
  );
}

export default Password;
