import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../../context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextError } from "./TextError";
import * as Yup from "yup";
import { Button } from "../../../components";
import { fieldClassName, formClassName } from "../Classnames";
import { Input } from "../Input";

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
  const { signup, setIsSignedUp } = useContext(AuthContext) as AuthContextType;

  const onSubmit = async ({ accountName, username, email, password }: Values) => {
    if (!accountName || !username || !email || !password) return;
    signup(accountName, username, email, password);
  };

  return (
    <section>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={formClassName}>
          <div className="flex flex-col" id="errorBox"></div>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="accountName">Account Name:</label>
              <ErrorMessage name="accountName" component={TextError} />
            </div>
            <Field type="text" id="accountName" name="accountName" className={fieldClassName} />
          </Input>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="username">Username:</label>
              <ErrorMessage name="username" component={TextError} />
            </div>
            <Field type="text" id="username" name="username" className={fieldClassName} />
          </Input>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="email">Email:</label>
              <ErrorMessage name="email" component={TextError} />
            </div>
            <Field type="email" id="email" name="email" className={fieldClassName} />
          </Input>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="password" className="flex flex-col">
                <span>Password:</span>
              </label>
              <ErrorMessage name="password" component={TextError} />
            </div>
            <Field type="password" id="password" name="password" className={fieldClassName} />
          </Input>
          <Input>
            <div className="flex justify-between">
              <label htmlFor="confirmPassword">Repeat password:</label>
              <ErrorMessage name="confirmPassword" component={TextError} />
            </div>
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={fieldClassName}
            />
          </Input>
          <div className="text-center">
            <Button submit>Sign up</Button>
          </div>
        </Form>
      </Formik>
      <div className="text-center my-2">
        <span>Already have an account?</span>
        <Button onClick={() => setIsSignedUp(true)}>Login</Button>
      </div>
    </section>
  );
}
