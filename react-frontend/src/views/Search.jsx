import { useState } from "react";
import { useNavigate } from "react-router-dom";
import npcData from '../assets/NpcID.json';
import FeaturedGame from "../components/FeaturedGame";
import PopularBosses from "./PopularBosses.json"

const SearchContent = () => {
    const apiDomain = import.meta.env.VITE_API_DOMAIN;
    const navigate = useNavigate();
    const [boss, setBoss] = useState({ boss: '' });
    const [bossData, setBossData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [featured, setFeatured] = useState(PopularBosses);

    const handleChange = (e) => {
        const input = e.target.value;
        setBoss({ boss: input });

        if (input.length > 0) {
            const filteredSuggestions = Object.keys(npcData).filter((npc) =>
                npc.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (npcName) => {
        setBoss({ boss: npcName });
        setSuggestions([]);
        const data = await getBossData(npcName);
        setBossData([data, npcName]);
        setFeatured((prev) => {
            const updated = [...prev.filter(boss => boss.name !== npcName), { name: npcName, image: data?.Inventory[4] }];
            return updated.slice(-6);
        });
        navigate("/simulator", { state: { bossData: [data, npcName] } });
    };

    const getBossData = async (npcName) => {
        try {
            const response = await fetch(`${apiDomain}/get-boss`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ boss: npcName })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching boss data in search', error);
            alert('Please enter a valid NPC');
        }
    };

    const handleSubmit = async (e, bossName = null) => {
        if (e && e.preventDefault) {
            e.preventDefault(); // Prevent default form submission behavior
        }

        const nameToSearch = bossName || boss.boss; // Use the provided bossName or the state boss name
        const data = await getBossData(nameToSearch);

        if (data) {
            setBossData([data, nameToSearch]);
            setFeatured((prev) => {
                const updated = [...prev.filter(b => b.name !== nameToSearch), { name: nameToSearch, image: data?.Inventory[4] }];
                return updated.slice(-6);
            });
            setSuggestions([]);
            navigate("/simulator", { state: { bossData: [data, nameToSearch] } });
        }
    };

    return (
        <div className="row text-center content-area">
            <div className="search-content col-md-8 my-5">
                {bossData ? '' : <h1 className="search-title">Drop Simulator!</h1>}
                <form className="search-bar input-group" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Boss Name"
                        aria-label="Boss's username"
                        aria-describedby="button-addon2"
                        value={boss.boss}
                        onChange={handleChange}
                    />
                    <button
                        className="btn btn-success"
                        type="submit"
                        id="button-addon2"
                    >
                        Search
                    </button>
                </form>
                {suggestions.length > 0 && (
                    <ul className="list-group">
                        {suggestions.map((npc, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleSuggestionClick(npc)}
                            >
                                <h5>{npc}</h5>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {!bossData && (
				<div className="popular-section">
					<h1 className="mt-5">Popular Bosses</h1>
					<div className="popular-bosses-track">
						{featured.map((game, index) => (
							<FeaturedGame
								key={index}
								cardInfo={game}
								onClick={() => handleSubmit(null, game.name)}
							/>
						))}
					</div>
				</div>
			)}
        </div>
    );
};

export default SearchContent;