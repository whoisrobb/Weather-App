import React, { useState, useEffect } from 'react';

const CityInput = ({ sendSelectedSuggestion }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    let timeoutId = null;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
          {
            headers: {
              'X-RapidAPI-Key': '905a1df80cmshe13a0a693dc4d6dp129a74jsndbe0e5658d6c',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        const data = await response.json();

        if (data && data.data && data.data.length > 0) {
          const citySuggestions = data.data.map((city) => ({
            city: city.city,
            countryCode: city.countryCode,
            latitude: city.latitude,
            longitude: city.longitude,
          }));
          // console.log()
          setSuggestions(citySuggestions);
          setSelectedSuggestion(citySuggestions[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    clearTimeout(timeoutId); // Clear previous timeout
    if (inputValue) {
      timeoutId = setTimeout(fetchSuggestions, 1000); // Delay the API call by 1 second
    }

    return () => {
      clearTimeout(timeoutId); // Clear timeout on component unmount
    };
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.city);
    setSelectedSuggestion(suggestion);
    setShowDropdown(false);
    sendSelectedSuggestion(suggestion); // Pass the selected suggestion object
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSuggestion) {
      sendSelectedSuggestion(selectedSuggestion);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Enter a city"
        />
      </form>

      {showDropdown && inputValue && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={selectedSuggestion === suggestion ? 'selected' : ''}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.city}, {suggestion.countryCode}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected city details */}
      {/* {selectedSuggestion && (
        <div>
          <p>City: {selectedSuggestion.city}</p>
          <p>Country Code: {selectedSuggestion.countryCode}</p>
          <p>Latitude: {selectedSuggestion.latitude}</p>
          <p>Longitude: {selectedSuggestion.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default CityInput;