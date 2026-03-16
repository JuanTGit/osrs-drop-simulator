import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaGamepad, FaGithub, FaLinkedin } from "react-icons/fa";

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
					<Link to="/projects">
						<FaGamepad className="icon" />
						{!collapsed && <span>Projects</span>}
					</Link>
				</li>
				<li>
					<a href="https://github.com/JuanTGit" target="_blank" rel="noopener noreferrer">
						<FaGithub className="icon" />
						{!collapsed	&& <span>GitHub</span>}
					</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/juan-tejeda/" target="_blank" rel="noopener noreferrer">
						<FaLinkedin className="icon" />
						{!collapsed && <span>LinkedIn</span>}
					</a>
				</li>
			</ul>
	  </nav>  
	)
}

export default Navbar;