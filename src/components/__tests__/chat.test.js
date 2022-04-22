import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chat from '../Chat'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'

describe('chat', () => {
    test('render chat component', () => {
        
        const user = {email: "test@email.com"};

        render(
            <BrowserRouter>
                <Chat user={user}/>
            </BrowserRouter>
        );

        expect(screen.getByText('Kin Kin')).toBeInTheDocument();
    })
});
