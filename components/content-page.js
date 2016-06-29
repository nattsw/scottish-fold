import React, {PropTypes, Component} from 'react'

export default class ContentPage extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				{this.props.content}
            </div>
		)
	}
}

ContentPage.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string
};
