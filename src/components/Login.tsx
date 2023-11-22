import classes from "./Login.module.css";
import { Button } from "./UI";
import Link from "next/link";

const Login = () => {
  return (
    <div className={classes.login}>
      <Link href="/api/auth/signin">
        <Button>Sign In</Button>
      </Link>
      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
      {/* <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" /> */}
    </div>
  );
};

export default Login;
