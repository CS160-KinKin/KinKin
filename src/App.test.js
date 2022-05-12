import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';
import {
  About,
  Home,
  NotFound,
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
  Navigation,
  Footer,
  AdditionalInformationCollection,
} from './components';

import ClientProfile from './components/Profile/ClientProfile.jsx';
import EditClient from './components/Profile/EditClient.jsx';

describe('app renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Route')).toBeTruthy();
  });
});

describe('About renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<About />);
    expect(wrapper.find('h1').text()).toEqual('About');
  });
});

describe('Navigation renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Navigation />);
  });
});

describe('Home renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Home />);
  });
});

describe('Notfound renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<NotFound />);
  });
});

describe('Footer renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Footer />);
  });
});

describe('Info collection page renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<AdditionalInformationCollection />);
  });
});

describe('ClientProfile renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<ClientProfile />);
  });
});

describe('EditClient renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<EditClient profile={{bio: ''}} />);
  });
});
