import React, {Component} from 'react';
import Navbar from '../components/navbar';
import ContentPage from '../components/content-page';

export default class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<ContentPage
					title={"Cats and Kittens"}
					content={"Something"} />
			</div>
		);
	}
}
