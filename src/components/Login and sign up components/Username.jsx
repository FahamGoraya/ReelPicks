import { useState } from "react";
import "../../pages/Login.css";
function Username(props) {
  const handle_User = (event) => {
    props.SetUsername(event.target.value);
    props.setError(""); // Reset error message
  };

  return (
    <>
      <h4 className="SignupHeading">Username : </h4>
      <input
        className="SignupText"
        value={props.username}
        onChange={handle_User}
        required
      />
    </>
  );
}

export default Username;
