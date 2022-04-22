import React from 'react';
import { shallow } from "enzyme";
import App from "./App.jsx";
import {
  About,
  Home,
  Login,
  NotFound,
  UserDashboard,
  Chat,
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
  Navigation,
  Footer
} from './components';

describe('app renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<App />);
  });
});

describe('About renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<About />);
  });
});

describe('Chat renders', function () {
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

describe('UserDashboard renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<UserDashboard />);
  });
});

describe('WorkoutList renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<WorkoutList />);
  });
});

describe('EditWorkoutTask renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<EditWorkoutTask />);
  });
});

describe('Login renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Footer />);
  });
});

describe('CreateWorkoutTask renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<CreateWorkoutTask />);
  });
});