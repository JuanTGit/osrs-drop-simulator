import osrsImg from "../assets/osrs-api.png"
import ecomImg from "../assets/ecommerce.png"
import portfolio from "../assets/portfolio.png"
import trackerImg from "../assets/val-tracker.png"
import osrsDropSim from "../assets/drop-sim.png"
import duelArena from "../assets/duel-arena.png"
import {
	DiReact,
	DiPython,
	DiGit,
    DiHtml5,
    DiPostgresql,
    DiCss3,
    DiNodejsSmall
  } from "react-icons/di";
import { BiLogoFlask, BiLogoJavascript } from "react-icons/bi";
import Project from "../components/Project";
import './project.css'

function Projects(){
    const icons = [
        <DiPython key="Python" />,
        <BiLogoFlask key="Flask" />,
        <DiPostgresql key="SQL" />,
        <BiLogoJavascript key="JavaScript" />,
        <DiReact key="React"/>,
        <DiHtml5 key="HTML" />,
        <DiCss3 key="CSS"/>,
        <DiGit key="Git"/>,
        <DiNodejsSmall key="Node"/>
    ]

    const valorantBotIcons = [icons[3], icons[7], icons[8], icons[2]]
    const projectTwoIcons = [icons[3], icons[5], icons[7]]

    return(
        <div className="container" id="projects">
            <h1 className="text-center" id="project-title">Projects</h1>

            {/* DropTable Project */}
            <Project 
                projectName="OSRS Drop Simulator"
                projectImage={osrsDropSim}
                projectImageAlt="Ecommerce Project"
                projectDesc="This project showcases object-oriented programming (OOP) in Python through a Drop Table system, efficiently managing item drops, probabilities, and rewards. It demonstrates clean, modular code design and algorithmic problem-solving—key skills for scalable software development."
                icons={icons.slice(0,8)}
                liveSiteUrl="https://drop-simulator.vercel.app/"
                githubUrl="https://github.com/JuanTGit/OOP/tree/main/drop-table"
            />

            {/* DuelArena Project */}
            <Project 
                projectName="Duel Arena"
                projectImage={duelArena}
                projectImageAlt="Duel-Arena Project"
                projectDesc="An interactive React game simulating turn-based combat with local and online duel modes. Features dynamic health bars, hit-splat damage effects, and real-time turn logic. Built with React, hooks, and router for smooth gameplay and replayability."
                icons={icons.slice(3,8)}
                liveSiteUrl="https://www.duel-arena.com/"
                githubUrl="https://github.com/JuanTGit/duel-arena"
            />

			{/* OSRS GE API Project */}
			<Project
				projectName="OSRS Item Prices"
				projectImage={osrsImg}
				projectImageAlt="OSRS API Project"
				projectDesc="This API accesses Old School RuneScape's Grand Exchange data. Built with Node.js, it uses Express for the server and Axios for HTTP requests, providing real-time pricing information for in-game items."
				icons={projectTwoIcons}
				liveSiteUrl="https://osrs-ge-api.vercel.app/"
				githubUrl="https://github.com/JuanTGit/osrs-ge-api"
			/>

			{/* Valorant Tracker Project */}
			<Project
				projectName="Valorant Tracker"
				projectImage={trackerImg}
				projectImageAlt="Discord Bot Project"
				projectDesc="This Valorant stats tracker is a Discord bot built with Node.js and JavaScript. It fetches and displays player statistics using the Valorant API, featuring a user-friendly interface, real-time data updates, responsive design, and is hosted on Heroku."
				icons={valorantBotIcons}
				addBot="https://discord.com/oauth2/authorize?client_id=1270879010267594842"
				githubUrl="https://github.com/JuanTGit/valorant-tracker"
			/>

			{/* Portfolio Project */}
			<Project
				projectName="Personal Portfolio"
				projectImage={portfolio}
				projectImageAlt="Portfolio Project"
				projectDesc="This repository hosts my personal portfolio website built with HTML, CSS, and JavaScript. It showcases projects, skills, and experiences, featuring responsive design, interactive elements, and smooth navigation for an engaging user experience."
				icons={icons.slice(3,8)}
				liveSiteUrl="https://www.juan-tejeda.com"
				githubUrl="https://github.com/JuanTGit/JuanTGit.github.io"
			/>

            {/* Ecommerce Project */}
            <Project 
                projectName="Ecommerce Store"
                projectImage={ecomImg}
                projectImageAlt="Ecommerce Project"
                projectDesc="This project features a React front end and a Flask back end. It includes user authentication, product listings, a shopping cart, an integrated payment system, Jinja2 templating, SQLAlchemy for database management, Blueprints for modular code, and configurations for easy deployment, providing a seamless online shopping experience."
                icons={icons.slice(0,8)}
                liveSiteUrl="https://ecommerce-portfolio-jt.vercel.app/"
                githubUrl="https://github.com/JuanTGit/flask_setup"
            />

        </div>
    );
}

export default Projects;







// const Projects = () => {
// 	return(
// 		<div className="container">
// 			{/* Header */}
// 			<div className="row content-area m-5">
// 				<div className="col-12 text-center">
// 					<h1>Projects</h1>
// 				</div>
// 			</div>
// 			{/* Projects */}
// 			<div className="row">
// 				{/* Duel Arena */}
// 				<div className="col-12">

// 				</div>

// 				{/* Grand Exchange */}
// 				<div className="col-12"></div>

// 				{/* Valorant Tracker */}
// 				<div className="col-12"></div>
// 			</div>
// 		</div>
// 	)
// }

// export default Projects;