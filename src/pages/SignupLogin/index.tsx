import { Signup, Login } from "../../components";

export function SignupLogin() {
  return (
    <div className="bg-zinc-400 text-black">
      <div className="text-center font-bold m-1">Sign up</div>
      <div>
        <Signup />
      </div>
      <div className="text-center font-bold m-1">Log in</div>
      <div>
        <Login />
      </div>
    </div>
  );
}
