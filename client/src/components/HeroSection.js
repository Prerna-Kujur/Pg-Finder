import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?address=${searchTerm}`);
  };

  return (
    <section className="hero-section">
      <h1 className="hero-title">Find Your Perfect PG</h1>
      <p className="hero-subtitle">Discover the ideal paying guest accommodation for your needs.</p>
      <div className="hero-search">
        <form className="hero-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="hero-search-input"
            placeholder="Enter Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="hero-search-button">Search</button>
        </form>
      </div>
    </section>
  );
}





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import './styles/HeroSection.css';

// export default function HeroSection() {
//   const navigate = useNavigate(); // Get the navigate function from React Router

//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Use the navigate function to navigate to the search page with the city name as a query parameter
//     navigate(`/search?address=${searchTerm}`);
//   };

//   return (
//     <section className="hero">
//       <h1 className="hero-title">Find Your Perfect PG</h1>
//       <p className="hero-subtitle">Discover the ideal paying guest accommodation for your needs.</p>
//       <div className="search">
//         <form className="search-form" onSubmit={handleSearch}>
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Enter Location..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="search-button">Search</button>
//         </form>
//       </div>
//     </section>
//   );
// }
