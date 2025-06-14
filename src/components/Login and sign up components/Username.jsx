import { useState } from "react";
import "../../pages/Login.css";
function Username(props) {
  const handle_User = (event) => {
    props.SetName(event.target.value);
    props.setError(""); // Reset error message
  };

  return (
    <>
      <h4 className="SignupHeading">Email : </h4>
      <input
        className="SignupText"
        value={props.name}
        onChange={handle_User}
        required
      />
    </>
  );
}

export default Username;
