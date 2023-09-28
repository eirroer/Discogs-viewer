import React, { useState } from 'react';
import './App.css';
import DisplayData from './DisplayData';
import { useEffect } from 'react';

function App() {

  const customUserAgent = "Discogs viewer client/1.0";
  const UserToken = "uLEGXkRxxPeyuTLNPSnnUyUNFHJeMqZRQrRoaCGM";

  const [apiData, setApiData] = useState([]); // [] is the initial state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchArtist, setSearchArtist] = useState("");
  const [onlyInMyCollection, setOnlyInMyCollection] = useState(false);

  useEffect(() => {

    if (!searchArtist) {
      return;
    }

    let API_URL = "https://api.discogs.com/database/search?type=release&";
    API_URL += `token=${UserToken}&`;

    if (searchArtist) {
      API_URL += `q=${searchArtist}&`;
    }

    if (pageNumber) {
      API_URL += `page=${pageNumber}&`;
    }

    if (pageSize) {
      API_URL += `per_page=${pageSize}&`;
    }
    
    console.log("Querying API: " + API_URL)
    fetch(API_URL, {
      headers: {
        'User-Agent': customUserAgent,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.discogs.v2.plaintext+json'
      }
    })
      .then(response => response.json())
      .then ((data) => {
        // update view
        setApiData(data)
      })
      .catch(err => console.log(err))
  }, [pageNumber, pageSize, searchArtist, onlyInMyCollection])


  return (
    <div className="App">
      <h1>Discogs viewer client</h1>
      <SearchArtist searchArtist={searchArtist} setSearchArtist={setSearchArtist}  onlyInMyCollection={onlyInMyCollection} setOnlyInMyCollection={setOnlyInMyCollection} />
      <DisplayData apiData={apiData} />
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} apiData={apiData} />
    </div>
  );
}

function SearchArtist({ searchArtist, setSearchArtist, onlyInMyCollection, setOnlyInMyCollection }) {
  function handleSearchArtistChange(e) {
    setSearchArtist(e.target.value);
  }

  return (
    <div>
      <p>Search Artist:</p>
      <input
        type="text"
        placeholder="Search Artist"
        id="searchArtist"
        name="searchArtist"
        value={searchArtist}
        onChange={handleSearchArtistChange}
      />
      <button onClick={handleSearchArtistChange}>Search</button>
      <input 
        type="checkbox"
        id="onlyInMyCollection"
        name="onlyInMyCollection"
        value="onlyInMyCollection"
        onChange={(e) => setOnlyInMyCollection(e.target.checked)}
      />
      <label htmlFor="onlyInMyCollection">Only in my collection</label>
    </div>
  );
}


function Pagination({ pageNumber, setPageNumber, apiData }) {
  var pageCount = 22;

  if (apiData.pager) {
    pageCount = apiData.pager.pageCount;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Prev
      </button>
      <p>
        {pageNumber} of {pageCount}
      </p>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === pageCount}
      >
        Next
      </button>
    </div>
  );
}

export default App;
