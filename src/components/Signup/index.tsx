import { useContext, useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AuthContext, AuthContextType } from "../../context";
import { useUploadImg } from "../../lib/api-hooks";
import { FetchState } from "../../utils/types";
import { Modal } from "../Modal";
import { Upload } from "../Upload";

const inputClassName = "flex justify-between p-1 my-1";

export function Signup() {
  const { signup, signupError } = useContext(AuthContext) as AuthContextType;
  const [accountName, setAccountName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);

  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    uploadedURL,
  ] = useUploadImg();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!accountName || !username || !email || !password) return;
    signup(accountName, username, email, password, uploadedURL);
  };

  useEffect(() => {
    let confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
    confirmPasswordInput.addEventListener("change", (e: any) => {
      if (password !== confirmPassword) return e.target.setCustomValidity("Passwords don't match");
      e.target.setCustomValidity("");
    });
  }, [password, confirmPassword]);

  return (
    <section>
      {signupError && (
        <div className="flex justify-center m-1">
          <span className="border px-2 py-1 rounded-lg bg-red-400">{signupError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-2 mx-10 shadow-xl rounded-lg">
        <div className="flex items-center justify-center h-40 mb-2">
          <div className="w-40 h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-800 dark:border-slate-500 my-5 px-1 py-2">
            <button type="button" onClick={() => setIsOpenUpload(true)} className="text-5xl">
              {uploadFetchState !== FetchState.SUCCESS ? (
                <BiImageAdd />
              ) : (
                <img src={uploadedURL} alt="chosen" className="w-72" />
              )}
            </button>
          </div>
        </div>
        <div className={inputClassName}>
          <label htmlFor="accountName">Account Name:</label>
          <input
            id="accountName"
            value={accountName}
            pattern="^\S+$"
            onInvalid={(e) =>
              (e.target as HTMLInputElement).setCustomValidity(
                "Account Name must not contain spaces."
              )
            }
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
            className="rounded-md"
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            required
          />
        </div>
        <div className={inputClassName}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            value={username}
            className="rounded-md"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div className={inputClassName}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            className="rounded-md"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className={inputClassName}>
          <label htmlFor="password" className="flex flex-col">
            <span>Password:</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onInvalid={(e) =>
              (e.target as HTMLInputElement).setCustomValidity(
                "Must contain at least: \n· 8 Characters, \n· A number, \n· A uppercase letter \n· A lowercase letter"
              )
            }
            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
            className="rounded-md"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className={inputClassName}>
          <label htmlFor="confirmPassword">Repeat password:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            className="rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-400 border rounded-full px-3 py-1">Sign up</button>
        </div>
      </form>
      {isOpenUpload && (
        <Upload
          isOpenUpload={isOpenUpload}
          setIsOpenUpload={setIsOpenUpload}
          handleSubmitFile={handleSubmitFile}
          handleFileInputChange={handleFileInputChange}
          fileInputState={fileInputState}
          previewSource={previewSource}
        />
      )}
    </section>
  );
}
