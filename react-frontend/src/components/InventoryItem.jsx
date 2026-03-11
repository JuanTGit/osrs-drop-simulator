

const InventoryItem = ({ itemName, quantity, value, image }) => {
	return(
		<li name={itemName}>
			<div>
				<p className="quantity-label">{Number(quantity).toLocaleString()}</p>
				<img id="inventory-item" src={image} alt={itemName} />
				<p>{itemName}</p>
				<p name={itemName}>{Number(value).toLocaleString()} gp</p>
			</div>
		</li>
	)
}

export default InventoryItem