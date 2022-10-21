import { Login } from "./Login";
import { Signup } from "./Signup";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import './LoginPage.css';

export function LoginPage(): JSX.Element {
  const [createAccount, setCreateAccount] = useState(false);

  return (
    <div className="LoginSignupForm">
      <Button onClick={()=>setCreateAccount(!createAccount)}>Change State</Button>
      {createAccount ? <Signup /> : <Login />}
    </div>
  );
}
