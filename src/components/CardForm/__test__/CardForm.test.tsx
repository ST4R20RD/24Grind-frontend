import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { CardForm, CardFormProps } from '..';
import { BrowserRouter } from 'react-router-dom';
import { FetchState } from '../../../utils/types';
import { MockPostCard } from '../../../lib/mockAPI';

const MockUser = {
    "id": 1,
    "username": "Gonçalo Estrelado",
    "userImage": "",
    "groupsIds": [
        1,
        2
    ],
    "cards": [
        {
            "id": 134634,
            "authorId": 1,
            "duration": "03h34",
            "date": "05/09/2022",
            "location": "Quinta da Alagoa",
            "tags": [
                "Grind",
                "AtHome"
            ],
            "category": "Phisical Training",
            "attachImage": "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000",
            "description": "100 💪, 30 Abdominais, 20 Dorsais",
            "groupName": "Grind Mindset",
            "participants": [
                {
                    "id": 2,
                    "userImage": "https://external-preview.redd.it/ERjNu9y3IVe0uWs5mBsX97dWyQ9Js0jL-kUo5XHn4R8.jpg?auto=webp&s=823ebc8c7ae4198886cf6c0d23acde708d8aff03"
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                }
            ]
        },
        {
            "id": 135642,
            "authorId": 1,
            "duration": "57'54",
            "date": "06/09/2022",
            "location": "Quinta da Alagoa",
            "tags": [
                "Grind"
            ],
            "category": "Phisical Training",
            "attachImage": "",
            "description": "100 Flexões, 30 Abdominais, 20 Dorsais",
            "groupName": "Grind Mindset",
            "participants": [
                {
                    "id": 2,
                    "userImage": "https://external-preview.redd.it/ERjNu9y3IVe0uWs5mBsX97dWyQ9Js0jL-kUo5XHn4R8.jpg?auto=webp&s=823ebc8c7ae4198886cf6c0d23acde708d8aff03"
                },
                {
                    "id": 4,
                    "userImage": ""
                },
                {
                    "id": 4,
                    "userImage": ""
                }
            ]
        }
    ]
}


const MockCardForm = ({ setIsOpenUpload, uploadFetchState, uploadedURL }: CardFormProps) => {
    return (
        <BrowserRouter>
            <CardForm
                setIsOpenUpload={setIsOpenUpload}
                uploadFetchState={uploadFetchState}
                uploadedURL={uploadedURL}
            />
        </BrowserRouter>
    )
}

const mockSetIsOpenUpload = jest.fn()
const mockUploadFetchState = FetchState.LOADING
const mockUploadedURL = ""

const defaultValues = {
    location: "Quinta da Alagoa",
    duration: "03:34",
    description: "100 💪, 30 Abdominais, 20 Dorsais"
}

beforeEach(() => {
    window.localStorage.setItem('currentUser', JSON.stringify(MockUser))
    render(<MockCardForm
        setIsOpenUpload={mockSetIsOpenUpload}
        uploadFetchState={mockUploadFetchState}
        uploadedURL={mockUploadedURL}
    />)
})

afterEach(() => {
    window.localStorage.clear();
});

describe("Should receive input correctly", () => {
    it("Location", () => {
        const inputElement = screen.getByPlaceholderText("Location") as HTMLInputElement;
        expect(inputElement.value).toBe("");
        fireEvent.change(inputElement, { target: { value: defaultValues.location } });
        expect(inputElement.value).toBe(defaultValues.location);
    })
    it("Duration", () => {
        const inputElement = screen.getByLabelText(/Grind Duration/i) as HTMLInputElement;
        expect(inputElement.value).toBe("");
        fireEvent.change(inputElement, { target: { value: defaultValues.duration } });
        expect(inputElement.value).toBe(defaultValues.duration);
    })
    it("Description", () => {
        const inputElement = screen.getByPlaceholderText(/Description/i) as HTMLInputElement;
        expect(inputElement.value).toBe("");
        fireEvent.change(inputElement, { target: { value: defaultValues.location } });
        expect(inputElement.value).toBe(defaultValues.location);
    })
})