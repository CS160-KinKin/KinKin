import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import Profile from '../Profile/Profile'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


describe('profile', () => {
    test('render profile page', async () => {

        render(
            <BrowserRouter>
                <Profile user={{}} />
            </BrowserRouter>
        )

        expect(screen.getByText("Interests")).toBeInTheDocument();
        expect(screen.getByText("Rate")).toBeInTheDocument();
        expect(screen.getByText("Location")).toBeInTheDocument();
    })
})