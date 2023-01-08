import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Login } from "..";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../../../context";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

const defaultValues = {
  AccountName: "userAccountName",
  Password: "12345678Ab",
};

describe("Should receive input correctly", () => {
  it("Account Name", () => {
    render(<MockLogin />);
    const inputElement = screen.getByLabelText("Account Name:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.AccountName } });
    expect(inputElement.value).toBe(defaultValues.AccountName);
  });

  it("Password", () => {
    render(<MockLogin />);
    const inputElement = screen.getByLabelText("Password:") as HTMLInputElement;
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: defaultValues.Password } });
    expect(inputElement.value).toBe(defaultValues.Password);
  });
});

describe("Testing Input Pattern Validity", () => {
  it("Account Name", () => {
    const validationPattern = /^\S+$/u;
    expect(validationPattern.test(defaultValues.AccountName)).toBeTruthy();
    render(<MockLogin />);
    const inputElement = screen.getByLabelText("Account Name:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });

  it("Password", () => {
    const validationPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/u;
    expect(validationPattern.test(defaultValues.Password)).toBeTruthy();
    render(<MockLogin />);
    const inputElement = screen.getByLabelText("Password:") as HTMLInputElement;
    const patternIsValid = !inputElement.validity.patternMismatch;
    expect(patternIsValid).toBeTruthy();
  });
});
