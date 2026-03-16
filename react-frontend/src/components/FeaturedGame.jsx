import '../Popular.css'


const FeaturedGame = ({ cardInfo, onClick }) => {
	return (
		<div className="card-popular">
			<div className="card-img-wrapper">
		  		<img src={cardInfo.image} className="card-img-popular" alt={cardInfo.name} />
			</div>
			<button className="card-body-popular" onClick={onClick}>
		  		<p className="card-text">Loot {cardInfo.name}!</p>
			</button>
	  </div>
	);
  };
  
  export default FeaturedGame;