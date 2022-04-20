import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {render, screen } from '@testing-library/react'
import Chat from '../Chat'
Enzyme.configure({ adapter: new Adapter() });

// meant to test the component but faced issues running 

// describe('Chat', () => {
//     test('render chat component', () => {
//         const wrapper = shallow(<Chat/>)
//         expect(wrapper.exists()).toBe(true);
//     })
// })

