
function Project(props){
	const {projectName, projectImage, projectImageAlt, projectDesc, icons, liveSiteUrl, githubUrl, addBot} = props;
	
	return(
		<div>
            {/* Project */}
            <div className="row my-5">
                {/* img */}
                <div className="col-12 col-sm-5">
                    <img id="project-img" src={projectImage} alt={projectImageAlt} />
                </div>
                <div className="col-sm-1"></div>
                {/* txt */}
                <div className="col-12 col-sm-6"  id="project-card">
                    <h1>{projectName}</h1>
                    <p>{projectDesc}</p>
                    <ul className="list-inline">
						{icons.map((icon, index) => (
							<li key={index} className="list-inline-item project-icon">{icon}</li>
						))}
                    </ul>
                    {liveSiteUrl ? (
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href={liveSiteUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Site</a>
                            </li>
                            <li className="list-inline-item">
                                <a href={githubUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </li>
                        </ul>
                    ): (
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href={addBot} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Add Bot</a>
                            </li>
                            <li className="list-inline-item">
                                <a href={githubUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </li>
                        </ul>
                    ) }

                </div>
			</div>
		</div>
	)
}

export default Project;