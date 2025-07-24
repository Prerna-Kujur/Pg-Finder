import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import "./styles/SearchLayout.css";
import PopulateRooms from "./PopulateRooms";

export default function SearchLayout() {

  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedFeatures, setselectedFeatures] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchOwnerName, setSearchOwnerName] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc"); // Default sorting order
  const location = useLocation(); // Get the current location from React Router

  useEffect(() => {
    // Parse the query parameters from the location
    const searchParams = new URLSearchParams(location.search);
    
    // Check if there's a "city" parameter in the URL
    if (searchParams.has('address')) {
      const address = searchParams.get('address');
      setSearchAddress(address); // Set the city name as the default text in the search address input
    }
  }, [location.search]);

  const toggleSortingOrder = () => {
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  function handleFeaturesChange(amenity) {
    const updatedFeatures = [...selectedFeatures];

    if (updatedFeatures.includes(amenity)) {
      const index = updatedFeatures.indexOf(amenity);
      updatedFeatures.splice(index, 1);
    } else {
      updatedFeatures.push(amenity);
    }

    setselectedFeatures(updatedFeatures);
  }

  return (
    <div className="search-layout">
      <div className="search-layout-main-content">
        <aside className="search-layout-sidebar-container">
          <h2 className="search-layout-sidebar-heading">Filters:</h2>

          <div className="sorting-container">
            <span className="sorting-label">Sort by Price:</span>
            <button
              className="sorting-toggle"
              onClick={toggleSortingOrder}
              title={`Toggle Sorting Order (Currently: ${
                sortingOrder === "asc" ? "High to Low" : "Low to High"
              })`}
            >
              <i
                className={`fas fa-sort-${
                  sortingOrder === "asc" ? "down" : "up"
                }`}
              />
              {sortingOrder === "asc" ? "High to Low" : "Low to High"}
            </button>
          </div>

          <div className="search-layout-filter">
            <h3>Price Range</h3>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="">All Price Ranges</option>
              <option value="2000">
                Less than Rs.2000/month
              </option>
              <option value="2500">
                Less than Rs.2500/month
              </option>
              <option value="5000">
                Less than Rs.5000/month
              </option>
              <option value="10000">
                Less than Rs.10000/month
              </option>
              {/* Add more price range options here */}
            </select>
          </div>

          <div className="search-layout-filter">
            <h3>Features</h3>
            <div className="features-checkboxes">
              <label>
                <input
                  type="checkbox"
                  value="fa-wifi"
                  checked={selectedFeatures.includes("fa-wifi")}
                  onChange={(e) => handleFeaturesChange("fa-wifi")}
                />
                Wi-Fi
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-parking"
                  checked={selectedFeatures.includes("fa-parking")}
                  onChange={(e) => handleFeaturesChange("fa-parking")}
                />
                Parking
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-bed"
                  checked={selectedFeatures.includes("fa-bed")}
                  onChange={(e) => handleFeaturesChange("fa-bed")}
                />
                Bed
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-snowflake"
                  checked={selectedFeatures.includes("fa-snowflake")}
                  onChange={(e) => handleFeaturesChange("fa-snowflake")}
                />
                Air Conditioning
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-fire"
                  checked={selectedFeatures.includes("fa-fire")}
                  onChange={(e) => handleFeaturesChange("fa-fire")}
                />
                Heating
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-bath"
                  checked={selectedFeatures.includes("fa-bath")}
                  onChange={(e) => handleFeaturesChange("fa-bath")}
                />
                Private Bathroom
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-sun"
                  checked={selectedFeatures.includes("fa-sun")}
                  onChange={(e) => handleFeaturesChange("fa-sun")}
                />
                Balcony/Terrace
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-paw"
                  checked={selectedFeatures.includes("fa-paw")}
                  onChange={(e) => handleFeaturesChange("fa-paw")}
                />
                Pet-Friendly
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-smoking-ban"
                  checked={selectedFeatures.includes("fa-smoking-ban")}
                  onChange={(e) => handleFeaturesChange("fa-smoking-ban")}
                />
                Non-Smoking
              </label>
              <label>
                <input
                  type="checkbox"
                  value="fa-wheelchair"
                  checked={selectedFeatures.includes("fa-wheelchair")}
                  onChange={(e) => handleFeaturesChange("fa-wheelchair")}
                />
                Wheelchair Accessible
              </label>
            </div>
          </div>
          {/* Add more filter options as needed */}
        </aside>

        <div className="search-layout-card-container">
          <div className="search-layout-search-bar-container">
            <div className="search-layout-search-input-container">
              <input
                type="text"
                className="search-layout-search-input"
                placeholder="Search PG Name..."
                aria-label="Search for PG Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="search-layout-search-input-container">
              <input
                type="text"
                className="search-layout-search-input"
                placeholder="Search Address..."
                aria-label="Search for Address"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </div>
            <div className="search-layout-search-input-container">
              <input
                className="search-layout-search-input"
                type="text"
                placeholder="Search Owner Name..."
                value={searchOwnerName}
                onChange={(e) => setSearchOwnerName(e.target.value)}
              />
            </div>
          </div>

          <br />
          <PopulateRooms
            selectedPriceRange={selectedPriceRange}
            selectedFeatures={selectedFeatures}
            searchText={searchText}
            searchAddress={searchAddress}
            searchOwnerName={searchOwnerName}
            sortingOrder={sortingOrder} // Pass sortingOrder as a prop
          />
        </div>
      </div>
    </div>
  );
}
