import { useState, useContext } from "react";
import { AuthContext, AuthContextType } from "../../context";

export function Login() {
  const { login, loginError } = useContext(AuthContext) as AuthContextType;
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    login(accountName, password);
  };

  const inputClassName = "flex justify-between p-1";

  return (
    <section>
      {loginError && (
        <div className="flex justify-center m-1">
          <span className="border px-2 py-1 rounded-lg bg-red-400">{loginError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-2 mx-10 border-2">
        <div className={inputClassName}>
          <label htmlFor="accountNameLogin">Account Name:</label>
          <input
            id="accountNameLogin"
            type="text"
            value={accountName}
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            required
          />
        </div>
        <div className={inputClassName}>
          <label htmlFor="passwordLogin">Password:</label>
          <input
            id="passwordLogin"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-400 border rounded-full px-3 py-1">Log in</button>
        </div>
      </form>
    </section>
  );
}
