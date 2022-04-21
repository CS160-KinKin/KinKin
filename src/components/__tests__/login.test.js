import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


describe('login', () => {
    test('render login component', () => {
    
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        
        expect(screen.getByText("Log in with Google")).toBeInTheDocument();
    })
})
