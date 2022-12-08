import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../../context";
import { useUploadImg } from "../../lib/api-hooks";
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
const passwordValid = (value: any) =>
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value);

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
  const { signup, setIsSignedUp } = useContext(AuthContext) as AuthContextType;

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
      <p className="text-center text-xl underline underline-offset-4">SIGNUP</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="p-2 mx-10 shadow-xl rounded-lg">
          <div className="flex flex-col" id="errorBox"></div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="accountName">Account Name:</label>
              <ErrorMessage name="accountName" component={TextError} />
            </div>
            <Field
              type="text"
              id="accountName"
              name="accountName"
              className="rounded-md"
            />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="username">Username:</label>
              <ErrorMessage name="username" component={TextError} />
            </div>
            <Field
              type="text"
              id="username"
              name="username"
              className="rounded-md"
            />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="email">Email:</label>
              <ErrorMessage name="email" component={TextError} />
            </div>
            <Field
              type="email"
              id="email"
              name="email"
              className="rounded-md"
            />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="password" className="flex flex-col">
                <span>Password:</span>
              </label>
              <ErrorMessage name="password" component={TextError} />
            </div>
            <Field
              type="password"
              id="password"
              name="password"
              className="rounded-md"
            />
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
            <button
              type="submit"
              className="bg-blue-400 border rounded-full px-3 py-1"
            >
              Sign up
            </button>
          </div>
        </Form>
      </Formik>
      <div className="text-center my-2">
        <span>Already have an account?</span>
        <button
          className="bg-blue-400 border rounded-full px-3 py-1"
          onClick={() => setIsSignedUp(true)}
        >
          Login
        </button>
      </div>
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
