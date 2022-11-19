import { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AuthContext, AuthContextType } from "../../context";
import { useUploadImg } from "../../lib/api-hooks";
import { FetchState } from "../../utils/types";
import { Upload } from "../Upload";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextError } from "./TextError";
import * as Yup from "yup";

const inputClassName = "flex flex-col justify-between p-1 my-1";

type Values = {
  accountName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues = {
  accountName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const noSpaces = (value: any) => /^\S+$/.test(value);
const passwordValid = (value: any) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value);

const validationSchema = Yup.object().shape({
  accountName: Yup.string()
    .test("NoSpaces", "Account Name must not contain spaces.", noSpaces)
    .required("Required"),
  username: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .test(
      "PasswordValid",
      "Password must contain at least: \n· 8 Characters, \n· A number, \n· A uppercase letter \n· A lowercase letter",
      passwordValid
    )
    .required("Choose a Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

export function Signup() {
  const { signup } = useContext(AuthContext) as AuthContextType;

  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);

  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    uploadedURL,
  ] = useUploadImg();

  const onSubmit = ({ accountName, username, email, password }: Values) => {
    if (!accountName || !username || !email || !password) return;
    signup(accountName, username, email, password, uploadedURL);
  };

  return (
    <section>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="p-2 mx-10 shadow-xl rounded-lg">
          <div className="flex flex-col" id="errorBox"></div>
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
            <div className="flex justify-between">
              <label htmlFor="accountName">Account Name:</label>
              <ErrorMessage name="accountName" component={TextError} />
            </div>
            <Field type="text" id="accountName" name="accountName" className="rounded-md" />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="username">Username:</label>
              <ErrorMessage name="username" component={TextError} />
            </div>
            <Field type="text" id="username" name="username" className="rounded-md" />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="email">Email:</label>
              <ErrorMessage name="email" component={TextError} />
            </div>
            <Field type="email" id="email" name="email" className="rounded-md" />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="password" className="flex flex-col">
                <span>Password:</span>
              </label>
              <ErrorMessage name="password" component={TextError} />
            </div>
            <Field type="password" id="password" name="password" className="rounded-md" />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="confirmPassword">Repeat password:</label>
              <ErrorMessage name="confirmPassword" component={TextError} />
            </div>
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="rounded-md"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-400 border rounded-full px-3 py-1">
              Sign up
            </button>
          </div>
        </Form>
      </Formik>
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
