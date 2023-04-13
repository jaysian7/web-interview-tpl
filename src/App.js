import React, { useState, useEffect } from 'react';
import logo from './Gametime_logo.png';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ events: [], performers: [], venues: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mobile-staging.gametime.co/v1/search?q=${searchTerm}`);
        const jsonData = await response.json();
       setSearchResults({
          events: jsonData.events.slice(0, 3),
          performers: jsonData.performers.slice(0, 3),
          venues: jsonData.venues.slice(0, 3)
        }); 
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };

    if (searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };





  return (
    <div className="App">
      <header className="App-header">
        <img className="Header-logo" src={logo} alt="logo" />
        <span style={{ height: "25px" }}></span>
        <div class="search-box">
          <input
              type="text"
              placeholder="Search for events, performers, or venues..."
              value={searchTerm}
              onChange={handleInputChange}
              onkeyup="{showResults}"
           />
           <ul class="search-results">
            {searchResults.events.map(result => (
              <li key={result.id}>
                <img className="Result-image" src={result.event.map_url} alt={result.event.name} />
                <div>
                  <h4 className="Result-title">{result.event.name}</h4>
                  <p className="Result-subtitle">{result.venue.name}</p>
                </div>
              </li>
            ))}
            {searchResults.performers.map(result => (
              <li key={result.id}>
                <img className="Result-image" src={result.hero_image_url} alt={result.name} />
                <div>
                  <h4 className="Result-title">{result.name}</h4>
                  <p className="Result-subtitle">{result.category}</p>
                </div>
              </li>
            ))}
            {searchResults.venues.map(result => (
              <li key={result.id}>
                <img className="Result-image" src={result.image_url} alt={result.name} />
                <div>
                  <h4 className="Result-title">{result.name}</h4>
                  <p className="Result-subtitle">{result.city}</p>
                </div>
              </li>
            ))}
           </ul>
        </div>
        {error && <p>{error}</p>}
      </header>
    </div>
  );
}

export default App;