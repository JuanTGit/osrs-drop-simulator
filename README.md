# OSRS Drop Simulator

A full-stack web application that simulates and displays drop tables for Old School RuneScape bosses. The app scrapes live data from the OSRS Wiki and presents it in an interactive UI.

🔗 **[Live Site](https://drop-simulator.vercel.app/)**

---

## Tech Stack

**Frontend**
- React (Vite)
- JavaScript
- CSS / Bootstrap

**Backend**
- Python
- Flask
- BeautifulSoup4 (web scraping)
- REST API

**Database & Hosting**
- PostgreSQL (Neon)
- Vercel (frontend + backend)

---

## Features

- 🔍 Search for any OSRS boss by name
- 📊 View full drop tables scraped live from the OSRS Wiki
- 🖼️ Displays item images, quantities, rarity, and GE value
- ⚡ Real-time data fetched and parsed from the wiki on demand

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Any SQL database compatible with SQLAlchemy (PostgreSQL, SQLite, MySql)

---

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your database connection string
# DATABASE_URL=postgresql://user:password@host/dbname
# VITE_API_DOMAIN=http://localhost:5000

# Run the Flask server
flask run
```

---

### Frontend Setup

```bash
cd react-frontend

# Install dependencies
npm install

# Create a .env file
# VITE_API_DOMAIN=http://localhost:5000

# Start the dev server
npm run dev
```

---

## Project Structure

```
osrs-drop-simulator/
├── backend/
│   ├── app.py              # Flask app entry point
│   ├── scraper.py          # OSRS Wiki scraper (BeautifulSoup)
│   ├── shared_state.py     # Shared boss state
│   ├── requirements.txt
│   └── .env                # Not committed
├── react-frontend/
│   ├── src/
│   ├── package.json
│   └── .env                # Not committed
└── convert_to_json.py      # Utility script for data conversion
```

---

## Environment Variables

**Backend `.env`**
```
DATABASE_URL=your_db_connection_string
```

**Frontend `.env`**
```
VITE_API_DOMAIN=http://localhost:5000
```

---

## Screenshots

<img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/e4e3ff11-80b9-47dd-b67a-d4138afa06ec" />


---

## Author

**Juan Tejeda** — [Portfolio](https://juan-tejeda.com/) | [GitHub](https://github.com/JuanTGit) | [LinkedIn](https://www.linkedin.com/in/juan-tejeda/)
