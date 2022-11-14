import { useState, useContext } from "react";
import { AuthContext, AuthContextType } from "../../context";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";
import { IoClose } from "react-icons/io5";

type Values = {
  accountNameLogin: string;
  passwordLogin: string;
};

const initialValues = {
  accountNameLogin: "",
  passwordLogin: "",
};

const noSpaces = (value: any) => /^\S+$/.test(value);
const passwordValid = (value: any) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value);

const validationSchema = Yup.object().shape({
  accountNameLogin: Yup.string()
    .test("NoSpaces", "Account Name must not contain spaces.", noSpaces)
    .required("Required"),
  passwordLogin: Yup.string()
    .test("PasswordValid", "Invalid Password", passwordValid)
    .required("Required"),
});

export function Login() {
  const { login, loginError, setLoginError } = useContext(AuthContext) as AuthContextType;

  const onSubmit = async ({ accountNameLogin, passwordLogin }: Values) => {
    login(accountNameLogin, passwordLogin);
  };

  const inputClassName = "flex flex-col justify-between p-1 my-1";

  return (
    <section>
      <div className="h-6">
        {loginError && (
          <div className="flex justify-center m-1">
            <span className="text-white border-y border-red-900 px-2 py-1 bg-red-500">
              <button className="align-middle text-2xl text-black pr-2" onClick={() => setLoginError("")}>
                <IoClose/>
              </button>
              {loginError}
            </span>
          </div>
        )}
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="p-2 mx-10 shadow-xl rounded-lg">
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="accountNameLogin">Account Name:</label>
              <ErrorMessage name="accountNameLogin" component={TextError} />
            </div>
            <Field id="accountNameLogin" type="text" name="accountNameLogin" />
          </div>
          <div className={inputClassName}>
            <div className="flex justify-between">
              <label htmlFor="passwordLogin">Password:</label>
              <ErrorMessage name="passwordLogin" component={TextError} />
            </div>
            <Field id="passwordLogin" type="password" name="passwordLogin" />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-400 border rounded-full px-3 py-1">
              Log in
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}
