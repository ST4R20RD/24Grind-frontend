import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../index'

const MockNavBar = () => {
    return (
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
}

describe('Navbar Tests', () => {
    it("should render properly", () => {
        render(<MockNavBar />)
        const divElement = screen.getByTestId("navbar")
        expect(divElement).toBeInTheDocument()
    })
    it("Trending button should render properly", () => {
        render(<MockNavBar/>)
        const headingElement = screen.getByRole("heading", {name: /feed/i})
        expect(headingElement).toBeInTheDocument()
    })
    it("Profile button should render properly", () => {
        render(<MockNavBar/>)
        const headingElement = screen.getByRole("heading", {name: /profile/i})
        expect(headingElement).toBeInTheDocument()
    })
})
