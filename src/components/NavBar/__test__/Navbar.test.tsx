import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../index'

const MockNavBar = () => {
    return (
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
}

it("should render properly", () => {
    render(<MockNavBar />)
    const divElement = screen.getByTestId("navbar")
    expect(divElement).toBeInTheDocument()
})