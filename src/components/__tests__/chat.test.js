import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chat from '../Chat/Chat'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'

describe('chat', () => {
    test('render chat component', () => {
        
        const user = {name: "First Last"};

        render(
            <BrowserRouter>
                <Chat user={user}/>
            </BrowserRouter>
        );

        //screen.debug

        expect(screen.getByText('Kin Kin')).toBeInTheDocument();
    })
});


