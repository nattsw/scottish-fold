import React, {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';

export default class Navbar extends Component {
	render() {
		return (
			<AppBar className="nav-main">
				<Navigation type="horizontal" className="nav-top">
					<Link to="/home">Home</Link>
					<Link to="/cat">Cat</Link>
				</Navigation>
			</AppBar>
		);
	}
}
