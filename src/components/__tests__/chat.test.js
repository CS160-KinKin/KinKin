import React from "react";
import {render, screen } from '@testing-library/react'
import Chat from '../Chat'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


describe('Chat', () => {
    test('render chat component', () => {
        // should fail

        render(
            <BrowserRouter>
                <Chat />
            </BrowserRouter>
        )
        
        
    })
})