import { useState } from "react";
import "../../pages/Login.css";

function Password() {
  const [pass, setPass] = useState("");

  const handle_Pass = (event) => {
    setPass(event.target.value);
  };

  return (
    <>
      <h4 className="SignupHeading">Password : </h4>
      <input
        type="password"
        className="SignupText"
        value={pass}
        onChange={handle_Pass}
      />
    </>
  );
}

export default Password;
