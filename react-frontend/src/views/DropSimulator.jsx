import { useEffect, useState } from "react";
import InventoryItem from "../components/InventoryItem";
import { useLocation } from "react-router-dom";


function DropSimulator(){
	const apiDomain = import.meta.env.VITE_API_DOMAIN
	const location = useLocation();
	const bossData = location.state?.bossData;


	const [inventoryItems, setInventoryItems] = useState({});
	const [statData, setStatData] = useState({'value': 0, 'kills': 0, 'image': ''});
	const [currentDrop, setCurrentDrop] = useState({});
	const [alertMessage, setAlertMessage] = useState(null);
	const [autoDrop, setAutoDrop] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const [animationClass, setAnimationClass] = useState('');
	const [bossName, setBossName] = useState('');

	useEffect(() => {
		if (bossData) {
			try {
				// console.log("Boss data received:", bossData);
				setStatData(prev => ({...prev, 'image': bossData[0].Inventory[4]}))
	
				function capitalizeWords(str) {
					return str.split(' ').map(word => {
							return word.charAt(0).toUpperCase() + word.slice(1);
					}).join(' ');
				}
	
				let bossNameCapital = capitalizeWords(bossData[1])
				setBossName(bossNameCapital)

			} catch (error) {
				console.error('Oops something went wrong displaying the data', error)
			}
		}
	}, [bossData]);

	const startDropping = () => {
		if (!autoDrop) {
			const id = setInterval(() => {
				getData();
			}, 1000);
			setIntervalId(id);
			setAutoDrop(true)
		}
	};

	const stopDropping = () => {
		if (autoDrop) {
			clearInterval(intervalId);
			setAutoDrop(false);
		}
	};

	const recentlyDeleted = async () => {
		try {
			const res = await fetch(`${apiDomain}/get-drop/drop-current`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Failed to fetch data:", error);
			return { Inventory: [], total: 0 };
		}
	};

	const handleRemoveItem = async (itemName) => {
		if (!inventoryItems[itemName]) {
			setAlertMessage(`${itemName} is no longer in your inventory.`)
			setTimeout(() => {
				setAlertMessage('')
			}, 3000)
			return
		}
		const data = await recentlyDeleted();
		updateOrRemoveItem(itemName, data.Inventory, data.total);
	};

	const updateOrRemoveItem = (itemName, updatedInventory, totalValue) => {
		setInventoryItems((prevItems) => {
			const updatedItems = { ...prevItems };
		
			if (updatedInventory[itemName]) {
				// Update the item in inventory
				updatedItems[itemName] = {
				...updatedItems[itemName],
				quantity: updatedInventory[itemName].quantity,
				value: updatedInventory[itemName].value,
				};
			} else {
				// Remove the item from inventory
				delete updatedItems[itemName];
			}
		
			return updatedItems;
			});
		
			// Update total value
			setStatData((prev) => ({ ...prev, value: totalValue }));
		
			// Show an alert if the item is no longer in inventory
			
	};

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		}
	}, [intervalId])

	const getData = async () => {
		try{
			let res = await fetch(`${apiDomain}/get-drop`)
			let data = await res.json()
			console.log(data)
			const rolledDrop = data.Inventory[2]
			setStatData(prev => ({...prev, 'value': data.Inventory[0], 'kills':data.Inventory[3], 'image': data.Inventory[4]}))
			setCurrentDrop({rolledDrop})
			console.log(rolledDrop['name'])
			setCurrentDrop({
				value: rolledDrop.value,
				image: rolledDrop.image,
				rarity: rolledDrop.rarity[1],
				itemName: rolledDrop.name,
				quantity: rolledDrop.quantity,
			})
			setAnimationClass('bounce');

			setInventoryItems((prevItems) => {
				const existingItem = prevItems[rolledDrop.name] || {}; // Check for existing item
				return {
					...prevItems,
					[rolledDrop.name]: {
						quantity: data.Inventory[1][rolledDrop.name].quantity, // Increment quantity
						value: data.Inventory[1][rolledDrop.name].value, // Update value
						itemName: rolledDrop.name, // Update name
						image: rolledDrop.image, // Update image
					},
				};
			});
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	
	}
	const clearInventory = async () => {
		return fetch(`${apiDomain}/clear-inventory`)
	};
	const handleClearInventory = async () => {
		await clearInventory();
	
		if (Object.keys(inventoryItems).length === 0) {
			console.error("Inventory already empty");
			setAlertMessage("Your inventory is empty.");
			setTimeout(() => {
				setAlertMessage('')
			}, 3000)
			return
		} else {
			setInventoryItems({});
			setStatData(prev => ({...prev, value: 0, kills: 0 }));
		}
	};
	
	const dismissAlert = () => {
		setAlertMessage(null);
	};
	useEffect(() => {
		if (animationClass === 'bounce') {
		  	const timer = setTimeout(() => {
				setAnimationClass(''); // Remove bounce class after animation completes
			}, 5000);
		  
		  	return () => clearTimeout(timer); // Clean up the timeout on unmount
		}
	}, [animationClass]);

	if (!bossData) {
        return <div>No boss data available. Please go back and search for a boss.</div>;
    }


	return(
		<>
		<div className="row text-center content-area">
			<div id="alert-container">
				{alertMessage && (
				<div
					className="alert alert-warning alert-dismissible fade show"
					role="alert"
				>
					{alertMessage}
					<button
					type="button"
					className="btn-close"
					aria-label="Close"
					onClick={dismissAlert}
					></button>
				</div>
				)}
			</div>


			<h1 className="text-center">{bossData[1]}</h1>
			{/* <!-- Row 1 --> */}
			<div className="row">
				<div className="text-center">
					<button type="button" className="btn btn-success col-6" id="get-drop" onClick={getData}>Roll Drop</button>
					{autoDrop ? 
						<button type="button" className="btn btn-danger col-2" id="get-drop" onClick={stopDropping}>Stop Auto Drop</button>
						: 
						<button type="button" className="btn btn-warning col-2" id="get-drop" onClick={startDropping}>Auto Drop</button>}
				</div>
			</div>

			{/* <!-- Row 2 Current Drop --> */}
			<div className="row">
				<div className="col-md-5 col-12 mt-5">
					{/* <!-- New Dropped Item --> */}
						<h4 className="text-center" id="kill-count">Total Kills: {statData.kills}</h4>
							{currentDrop.itemName ? 	
							<div className="card-body text-center">
								<h4 id="item-name">You received {Number(currentDrop.quantity).toLocaleString()} x {currentDrop.itemName}</h4>
								<img src={currentDrop.image} alt="" id="dropped-item-img" className={animationClass}/>
								<h5 className="card-text mt-1" id="dropped-item-details">Value: {Number(currentDrop.value).toLocaleString()}</h5>
								<h5 className="card-text mt-1" id="dropped-item-details">Drop Rate: {currentDrop.rarity}</h5>
								<a href="" className="btn btn-danger" id="remove-item" onClick={(e) => {e.preventDefault(); handleRemoveItem(currentDrop.itemName)}}>Drop Item</a>
							</div>
						: 
							<div className="card-body text-center">
								<h4 id="item-name"></h4>
								<img src="https://oldschool.runescape.wiki/images/Guide_prices.png" alt="" id="dropped-item-img"/>
								<h5 className="card-text mt-1" id="dropped-item-details">Drop Details</h5>
								<a href="" className="btn btn-danger" id="remove-item">Drop Item</a>
							</div>
							}
						<div className="mt-2">
							<img className="" src={statData.image} alt="" id="boss-img"/>
						</div>
						{statData.image ? <div className="w-100 justify-content-center d-flex">
							<object className="shadow" id="shadow"></object>
						</div> : <></>}
						
				</div>
				
			{/* <!-- Row 3 Inventory --> */}
				{/* <!-- Inventory --> */}
				<div className="col-md-7 col-12 mt-5">
						<h4 className="text-center mb-4" id="total-value">Total Value: {statData.value.toLocaleString()} gp</h4>
						<ul className="list-group list-group-flush" id="drop-details">
							{Object.keys(inventoryItems).map(key => (
								<InventoryItem
								key={key}
								itemName={inventoryItems[key].itemName}
								quantity={inventoryItems[key].quantity || 0}
								value={inventoryItems[key].value || 0}
								image={inventoryItems[key].image}
								/>
							))}
						</ul>
						<div className="clear-inventory">
							<button type="button" className="btn btn-danger col-3" id="clear-inventory" onClick={handleClearInventory}>Clear Inventory</button>
						</div>
				</div>
				{/* <!--  --> */}
			</div>
		</div>
		</>
	)
}

export default DropSimulator;