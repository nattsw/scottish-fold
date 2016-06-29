import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import {expect} from 'chai';
import Navbar from './navbar';

const {
	it,
	describe,
	beforeEach
} = window;

describe('Navbar', () => {
	beforeEach(() => {
		window.component = renderIntoDocument(<Navbar />);
		window.renderedDom = () => findDOMNode(window.component);
	});

	it('contains a link to the homepage', () => {
		const toLink = window.renderedDom().querySelector('a').attributes.to.value;
		expect(toLink).to.equal('/home');
	});
});
