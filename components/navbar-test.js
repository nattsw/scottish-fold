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

	it("'s second link goes to the home page", () => {
		const toLink = window.renderedDom().querySelectorAll('a')[0].attributes.to.value;
		expect(toLink).to.equal('/home');
	});

	it("'s second link goes to the cat page", () => {
		debugger;
		const toLink = window.renderedDom().querySelectorAll('a')[1].attributes.to.value;
		expect(toLink).to.equal('/cat');
	});
});
