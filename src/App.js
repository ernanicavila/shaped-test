import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './modules/Login';
import Home from './modules/Home'
import Register from './modules/Register'

function App() {
	return (
		<>
			<Routes>
				<Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logged" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
