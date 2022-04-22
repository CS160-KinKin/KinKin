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
        
        expect(screen.queryByText('Chat')).toBeNull();

        const user = {
            token: "someToken"
        }

        render(
            <BrowserRouter>
                <Navigation user={user}/>
            </BrowserRouter>
        )

        // testing, if after loging in, can see newly rendered nav links 
        expect(screen.getByText('Chat')).toBeInTheDocument();
    })
})

//screen.debug() // html output of app component
//screen.getByRole('') // outputs different accessible roles 