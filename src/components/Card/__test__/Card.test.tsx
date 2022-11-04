import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Card } from '../index'

const MockCard = {
    id: 1,
    authorId: 2,
    duration: '',
    date: '',
    location: '',
    category: '',
    attachImage: '',
    description: '',
    participants: [
        {
            id: 2,
            userImage: ''
        }
    ]
}

describe('Card Tests', () => {
    it('should render Spinner on Loading', () => {
        render(<Card {...MockCard} />)
        const divElement = screen.getByTestId('card-spinner')
        expect(divElement).toBeInTheDocument()
    })

    it('should render attached image when there is one', async () => {
        render(<Card {...MockCard} attachImage='http' />)
        const imgElement = await screen.findByAltText('AttachImg')
        expect(imgElement).toBeInTheDocument()
    })

    it("should not render attached image when there isn't one", async () => {
        render(<Card {...MockCard} attachImage='' />)
        const divElement = await screen.findByTestId('success-section')
        await waitFor(() => expect(divElement).toBeInTheDocument())
        const imgElement = screen.queryByAltText('AttachImg')
        expect(imgElement).not.toBeInTheDocument()
    })

    
})