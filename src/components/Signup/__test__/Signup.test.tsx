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
    )
}

describe('Should receive input correctly', () => {
    it("Account Name", () => {
        render(<MockSignup />)
        const inputElement = screen.getByLabelText('Account Name:') as HTMLInputElement
        expect(inputElement.value).toBe('')
        fireEvent.change(inputElement, { target: { value: 'userAccountName' } })
        expect(inputElement.value).toBe('userAccountName')
    })

    it("Username", () => {
        render(<MockSignup />)
        const inputElement = screen.getByLabelText('Username:') as HTMLInputElement
        expect(inputElement.value).toBe('')
        fireEvent.change(inputElement, { target: { value: 'username' } })
        expect(inputElement.value).toBe('username')
    })

    it("Email", () => {
        render(<MockSignup />)
        const inputElement = screen.getByLabelText('Email:') as HTMLInputElement
        expect(inputElement.value).toBe('')
        fireEvent.change(inputElement, { target: { value: 'user@email.com' } })
        expect(inputElement.value).toBe('user@email.com')
    })

    it("Password", () => {
        render(<MockSignup />)
        const inputElement = screen.getByLabelText('Password:') as HTMLInputElement
        expect(inputElement.value).toBe('')
        fireEvent.change(inputElement, { target: { value: '123456' } })
        expect(inputElement.value).toBe('123456')
    })

    it("Repeat Password", () => {
        render(<MockSignup />)
        const inputElement = screen.getByLabelText('Repeat password:') as HTMLInputElement
        expect(inputElement.value).toBe('')
        fireEvent.change(inputElement, { target: { value: '123456' } })
        expect(inputElement.value).toBe('123456')
    })
})