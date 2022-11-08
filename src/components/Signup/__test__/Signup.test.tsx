import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Signup } from "..";
import { AuthContextProvider } from "../../../context";
import { BrowserRouter } from "react-router-dom";

const MockSignup = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Signup />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

const defaultValues = {
  AccountName: "userAccountName",
  Username: "username",
  Email: "user@email.com",
  Password: "12345678Ab",
};

describe("Should receive input correctly", () => {
  it("Account Name", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Account Name:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.AccountName } });
    expect(inputElement.value).toBe(defaultValues.AccountName);
  });

  it("Username", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Username:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.Username } });
    expect(inputElement.value).toBe(defaultValues.Username);
  });

  it("Email", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Email:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.Email } });
    expect(inputElement.value).toBe(defaultValues.Email);
  });

  it("Password", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Password:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.Password } });
    expect(inputElement.value).toBe(defaultValues.Password);
  });

  it("Repeat Password", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Repeat password:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.Password } });
    expect(inputElement.value).toBe(defaultValues.Password);
  });
});

describe("Testing Input Pattern Validity", () => {
  it("Account Name", () => {
    const validationPattern = /^\S+$/u;
    expect(validationPattern.test(defaultValues.AccountName)).toBeTruthy();
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Account Name:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });

  it("Username", () => {
    const validationPattern = /^\S+$/u;
    expect(validationPattern.test(defaultValues.Username)).toBeTruthy();
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Username:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });

  it("Email", () => {
    const validationPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u;
    expect(validationPattern.test(defaultValues.Email)).toBeTruthy();
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Email:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });

  it("Password", () => {
    const validationPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/u;
    expect(validationPattern.test(defaultValues.Password)).toBeTruthy();
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Password:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });

  it("Repeat Password", () => {
    const validationPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/u;
    expect(validationPattern.test(defaultValues.Password)).toBeTruthy();
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Repeat password:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });
});
