import './App.css'
import DropSimulator from './views/DropSimulator'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import SearchContent from './views/Search'
import Projects from './views/Projects';

function App() {
    return (
		<div className='main-layout'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<SearchContent />} />
					<Route path='/simulator' element={<DropSimulator />} />
					<Route path='/projects' element={<Projects />} />
				</Routes>
			</Router>
		</div>
    )
}

export default App
