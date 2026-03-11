

const FeaturedGame = ({ cardInfo, onClick }) => {

	return(
		<div className="card-popular">
			<img src={cardInfo.image} className="card-img-popular" alt="..."/>
			<button className="card-body-popular" onClick={onClick}>
				<p className="card-text">Loot {cardInfo.name}!</p>
			</button>
		</div>
	)
}

export default FeaturedGame;