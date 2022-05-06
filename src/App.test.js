import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';
import {
  About,
  Home,
  NotFound,
  UserDashboard,
  WorkoutList,
  EditWorkoutTask,
  CreateWorkoutTask,
  Navigation,
  Footer,
  Request,
  AdditionalInformationCollection,
  Profile,
  Chat
} from './components';

import ClientProfile from './components/Profile/ClientProfile.jsx';
import PTProfile from './components/Profile/PTProfile.jsx';
import EditClient from './components/Profile/EditClient.jsx';
import ChatContext from './components/Chat/ChatContext.jsx';
import RequestComponent from './components/Requests/RequestComponent.jsx';

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

describe('Footer renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Footer />);
  });
});

describe('CreateWorkoutTask renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<CreateWorkoutTask />);
  });
});

describe('Info collection page renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<AdditionalInformationCollection />);
  });
});

describe('Profile renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<Profile />);
  });
});

describe('ClientProfile renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<ClientProfile />);
  });
});

describe('Request Component renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<CreateWorkoutTask />);
  });
});


describe('EditClient renders', function () {
  it('should render!', function () {
    const wrapper = shallow(<EditClient />);
  });
});
