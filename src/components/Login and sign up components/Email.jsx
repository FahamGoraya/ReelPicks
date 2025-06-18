import { useState } from "react";
import "../../pages/Login.css";
function Email(props) {
  const handle_User = (event) => {
    props.SetEmail(event.target.value);
    props.setError(""); // Reset error message
  };

  return (
    <>
      <h4 className="SignupHeading">Email : </h4>
      <input
        className="SignupText"
        value={props.email}
        onChange={handle_User}
        type="email"
        required
      />
    </>
  );
}

export default Email;
