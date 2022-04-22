import React from "react";
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Marketplace from '../Marketplace/Marketplace'
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


describe('marketplace', () => {
    test('render marketplace component', async () => {
    
        render(
            <BrowserRouter>
                <Marketplace user={{}} />
            </BrowserRouter>
        )
        
        expect(screen.getByText("List of suggested PT's for you:")).toBeInTheDocument();
        expect(await screen.findAllByRole('spinbutton')).toHaveLength(3);
        expect(await screen.findAllByRole('textbox')).toHaveLength(1);
        expect(await screen.findAllByRole('combobox')).toHaveLength(2);
        expect(await screen.findAllByRole('button')).toHaveLength(1);
    })
})
