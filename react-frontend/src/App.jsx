import './App.css'
import DropSimulator from './views/DropSimulator'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import SearchContent from './views/Search'

function App() {
    return (
		<div className='container main-layout'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<SearchContent />} />
					<Route path="/simulator" element={<DropSimulator />} />
				</Routes>
			</Router>
		</div>
    )
}

export default App
