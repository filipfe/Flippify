import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AuthFormContext } from "../../providers/AuthFormProvider";

const forms = [<Register />, <Login />];

export default function Auth() {
  const [authFormIndex, setAuthFormIndex] = useState<0 | 1>(0);
  return (
    <AuthFormContext.Provider value={{ authFormIndex, setAuthFormIndex }}>
      {forms[authFormIndex]}
    </AuthFormContext.Provider>
  );
}
