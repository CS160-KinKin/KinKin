import React from "react";
import {render, screen } from '@testing-library/react'
import Navigation from '../Navigation'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'

describe('Navigation', () => {
    test('render Navigation component', () => {
        render(
            <BrowserRouter>
                <Navigation/>
            </BrowserRouter>
        )
        
        //screen.debug() // html output of app component
        //screen.getByRole('') // outputs different accessible roles 
        expect(screen.getByText('Kin Kin')).toBeInTheDocument();
    })
})

