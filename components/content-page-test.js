import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import {expect} from 'chai';
import ContentPage from './content-page';

const {
	it,
	describe,
	beforeEach
} = window;

describe('ContentPage', () => {
	beforeEach(() => {
		window.component = renderIntoDocument(<ContentPage title={"there's a fat cat"} content={"some content"} />);
		window.renderedDom = () => findDOMNode(window.component);
	});

	it('displays the title', () => {
		const title = window.renderedDom().querySelector('h1').innerText;
		expect(title).to.equal("there's a fat cat");
	});

	it('displays content', () => {
		debugger;
		const content = window.renderedDom().innerText;
		expect(content).to.contain('some content');
	});
});
