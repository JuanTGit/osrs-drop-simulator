import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaGamepad, FaServicestack, FaEnvelope } from "react-icons/fa";

function Navbar() {
	const [collapsed, setCollapsed] = useState(true);

	const expandNavbar = () => setCollapsed(false);
	const collapseNavbar = () => setCollapsed(true);

	return(
		<nav className={`vertical-navbar ${collapsed ? 'collapsed' : ''}`} onMouseEnter={expandNavbar} onMouseLeave={collapseNavbar}>
			<div className="navbar-logo">
				<img src={collapsed ? "/logo.png" : "/logotxt.png"} alt="Logo" />
			</div> 
	
	
			<ul className="navbar-links">
				<li>
					<Link to="/">
						<FaHome className="icon" />
						{!collapsed && <span>Home</span>}
					</Link>
				</li>
				<li>
					<Link to="/games">
						<FaGamepad className="icon" />
						{!collapsed && <span>Games</span>}
					</Link>
				</li>
				<li>
					<Link to="/services">
						<FaServicestack className="icon" />
						{!collapsed	&& <span>Services</span>}
					</Link>
				</li>
				<li>
					<Link to="/contact">
						<FaEnvelope className="icon" />
						{!collapsed && <span>Contact</span>}
					</Link>
				</li>
			</ul>
	  </nav>  
	)
}

export default Navbar;