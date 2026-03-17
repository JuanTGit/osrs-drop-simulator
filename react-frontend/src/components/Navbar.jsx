import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaGamepad, FaGithub, FaLinkedin } from "react-icons/fa";

function Navbar() {
	const [collapsed, setCollapsed] = useState(true);

	const expandNavbar = () => setCollapsed(false);
	const collapseNavbar = () => setCollapsed(true);

	useEffect(() => {
		const contentArea = document.querySelector('.content-area');
		if (!contentArea) return;
	
		if (window.innerWidth >= 992) {
			if (collapsed) {
				contentArea.classList.add('nav-collapsed');
				contentArea.classList.remove('nav-expanded');
			} else {
				contentArea.classList.add('nav-expanded');
				contentArea.classList.remove('nav-collapsed');
			}
		} else {
			contentArea.classList.remove('nav-collapsed');
			contentArea.classList.remove('nav-expanded');
		}
	}, [collapsed]);

	useEffect(() => {
		const mobileNav = document.getElementById('mobileNav');
	
		const handleShow = () => {
			document.querySelector('.content-area')?.classList.add('nav-open');
			document.querySelector('#projects')?.classList.add('nav-open');
		};
		const handleHide = () => {
			document.querySelector('.content-area')?.classList.remove('nav-open');
			document.querySelector('#projects')?.classList.remove('nav-open');
		};
	
		mobileNav.addEventListener('show.bs.collapse', handleShow);
		mobileNav.addEventListener('hide.bs.collapse', handleHide);
	
		return () => {
			mobileNav.removeEventListener('show.bs.collapse', handleShow);
			mobileNav.removeEventListener('hide.bs.collapse', handleHide);
		};
	}, []);

	return(
		<>
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

			{/* mobile navbar — only shown below md breakpoint */}
            <nav className="navbar navbar-dark d-lg-none w-100 mobile-navbar">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="/logotxt.png" alt="Logo" id="logo-mobile" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mobileNav"
                        aria-controls="mobileNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mobileNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <FaHome className="icon" />
									<span className="mx-1">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/projects" className="nav-link">
                                    <FaGamepad className="icon" />
									<span className="mx-1">Projects</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="https://github.com/JuanTGit" className="nav-link" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="icon" />
									<span className="mx-1">GitHub</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="https://www.linkedin.com/in/juan-tejeda/" className="nav-link" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="icon" />
									<span className="mx-1">LinkedIn</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

		</>
	)
}

export default Navbar;