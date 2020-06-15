import React from 'react';
import { render } from '@testing-library/react';
import { configure, shallow } from 'enzyme';

import Chat from './chat';
// import Sidebar from './sidebar';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Chat component", () => {
    const wrapper = shallow(<Chat />);

    test('renders Sidebar in Component', () => {
        expect(wrapper.find('.msg_cotainer').length).toEqual(1);
    });
});


