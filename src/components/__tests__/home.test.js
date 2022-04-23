import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../Home'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


describe('home', () => {
    test('render home component', () => {
    
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        
        expect(screen.getByText("Welcome!")).toBeInTheDocument();
    })
})
