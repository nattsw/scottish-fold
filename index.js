import 'react-toolbox/lib/commons.scss';
import React from 'react';
import { render } from 'react-dom';
import Navbar from './components/navbar';
const container = document.getElementById('container');

render(
    <Navbar />, container
);
