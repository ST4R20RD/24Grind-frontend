import { useContext } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";
import { IoClose } from "react-icons/io5";
import { AuthContext, AuthContextType } from "../../../context";
import { Button } from "../../../components";
import { fieldClassName, formClassName } from "../Classnames";
import { Input } from "../Input";

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
  const { login, loginError, setLoginError, setIsSignedUp } = useContext(
    AuthContext
  ) as AuthContextType;

  const onSubmit = async ({ accountNameLogin, passwordLogin }: Values) => {
    login(accountNameLogin, passwordLogin);
  };

  return (
    <section>
      <div className="h-6">
        {loginError && (
          <div className="flex justify-center m-1">
            <span className="text-white border-y border-red-900 px-2 py-1 bg-red-500">
              <button
                className="align-middle text-2xl text-black pr-2"
                onClick={() => setLoginError("")}
              >
                <IoClose />
              </button>
              {loginError}
            </span>
          </div>
        )}
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={formClassName}>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="accountNameLogin">Account Name:</label>
              <ErrorMessage name="accountNameLogin" component={TextError} />
            </div>
            <Field
              id="accountNameLogin"
              type="text"
              name="accountNameLogin"
              className={fieldClassName}
            />
          </Input>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="passwordLogin">Password:</label>
              <ErrorMessage name="passwordLogin" component={TextError} />
            </div>
            <Field
              id="passwordLogin"
              type="password"
              name="passwordLogin"
              className={fieldClassName}
            />
          </Input>
          <div className="text-center">
            <Button submit>Log in</Button>
          </div>
        </Form>
      </Formik>
      <div className="text-center my-2">
        <span>Don't have an account?</span>
        <Button onClick={() => setIsSignedUp(false)}>Signup</Button>
      </div>
    </section>
  );
}
