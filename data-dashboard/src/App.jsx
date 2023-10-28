import { useState, useEffect } from 'react'
import './App.css'
import EventInfo from './components/EventInfo';
import Card from './components/Card';
import EventChart from './components/EventChart';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const searchQuery = `https://api.seatgeek.com/2/events/?listing_count.gt=0&client_id=${API_KEY}`
  const [click, setClick] = useState(false);
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [highestPrice, setHighestPrice] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [soonestEvent, setSoonestEvent] = useState(null);
  const [pricesClicked, setPricesClicked] = useState("");
  const [concertsClicked, setConcertsClicked] = useState("");
  const [sportsClicked, setSportsClicked] = useState("");
  const [theaterClicked, setTheaterClicked] = useState("");
  const [comedyClicked, setComedyClicked] = useState("");
  // const [chartData, setChartData] = useState([{}]);

  useEffect(() => {
    const fetchAllEventsData = async() => {
      const response = await fetch (searchQuery);

      const json = await response.json();
      setList(json);
    }

    fetchAllEventsData().catch(console.error);
    getPriceRange(searchQuery).catch(console.error);
    getSoonestEvent(searchQuery).catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = [];

      for (let i = 0; i < list.events.length; i++) {
        if ((list.events[i].title).toLowerCase().includes(searchValue.toLowerCase())) {
          filteredData.push(i);
        }
      }

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.events));
    }
  };

  const resetFilter = () => {
    setClick(false);
    setFilteredResults([]);
    setPricesClicked("");
    setConcertsClicked("");
    setSportsClicked("");
    setTheaterClicked("");
    setComedyClicked("");

    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const filterPrices = () => {
    setClick(true);
    setPricesClicked("pricesClicked");
    const filteredData = [];

    if (filteredResults.length === 0) {
      setConcertsClicked("");
      setSportsClicked("");
      setTheaterClicked("");
      setComedyClicked("");
      for (let i = 0; i < list.events.length; i++) {
        filteredData.push(i);
      }
      for (let i = 0; i < filteredData.length; i++) {
          let min = i;
        for (let j = i+1; j < filteredData.length; j++) { 
            if (parseInt(list.events[filteredData[j]].stats.average_price) < 
                parseInt(list.events[filteredData[min]].stats.average_price)) {
              min = j;
            }
          }

        if (min != i) {
          let temp = filteredData[i];
          filteredData[i] = filteredData[min];
          filteredData[min] = temp;
        }
      }
      setFilteredResults(filteredData);
    } else {
      for (let i = 0; i < filteredResults.length; i++) {
        let min = i;
        for (let j = i+1; j < filteredResults.length; j++) { 
          if (parseInt(list.events[filteredResults[j]].stats.average_price) < 
              parseInt(list.events[filteredResults[min]].stats.average_price)) {
            min = j;
          }
        }

        if (min != i) {
          let temp = filteredResults[i];
          filteredResults[i] = filteredResults[min];
          filteredResults[min] = temp;
        }
      }
    }
    
    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const filterConcerts = () => {
    resetFilter();
    setClick(true);
    setConcertsClicked("concertsClicked");
    const filteredData = [];

    for (let i = 0; i < list.events.length; i++) {
      if ((list.events[i].type === "concert") || 
          (list.events[i].type === "music_festival")) {
        filteredData.push(i);
      } 
    }

    setFilteredResults(filteredData);
    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const filterSports = () => {
    resetFilter();
    setClick(true);
    setSportsClicked("sportsClicked");
    const filteredData = [];

    for (let i = 0; i < list.events.length; i++) {
      if (list.events[i].type === "sports") {
          filteredData.push(i);
      }
      for (let j = 0; j < list.events[i].taxonomies.length; j++) {
        if (list.events[i].taxonomies[j].name === "sports") {
          filteredData.push(i);
        }
      }
    }

    setFilteredResults(filteredData);
    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const filterTheater = () => {
    resetFilter();
    setClick(true);
    setTheaterClicked("theaterClicked");
    const filteredData = [];

    for (let i = 0; i < list.events.length; i++) {
      if (list.events[i].type === "theater") {
          filteredData.push(i);
      }
      for (let j = 0; j < list.events[i].taxonomies.length; j++) {
        if (list.events[i].taxonomies[j].name === "theater") {
          filteredData.push(i);
        }
      }
    }

    setFilteredResults(filteredData);
    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const filterComedy = () => {
    resetFilter();
    setClick(true);
    setComedyClicked("comedyClicked");
    const filteredData = [];

    for (let i = 0; i < list.events.length; i++) {
      if (list.events[i].type === "comedy") {
          filteredData.push(i);
      } 
    }

    setFilteredResults(filteredData);
    getPriceRange(searchQuery);
    getSoonestEvent(searchQuery);
  }

  const getPriceRange = async(query) => {
    const response = await fetch (query);
    const json = await response.json();
    let min;
    let max = 0;

    if (click === true && filteredResults.length !== 0) {
      min = json.events[filteredResults[0]].stats.average_price;
    } else {
      min = json.events[0].stats.average_price;
    }

    if (click === false) {
      for (let i = 0; i < json.events.length; i++) {
        if ((json.events[i].stats.average_price) < min) {
          min = json.events[i].stats.average_price;
        } else if ((json.events[i].stats.average_price) > max) {
          max = json.events[i].stats.average_price;
        }
      }
    } else {
      if (filteredResults.length === 0) {
        min = null;
        max = null;
      } else {
        for (let i = 0; i < filteredResults.length; i++) {
          if ((json.events[filteredResults[i]].stats.average_price) < min) {
            min = json.events[filteredResults[i]].stats.average_price;
          } else if ((json.events[filteredResults[i]].stats.average_price) > max) {
            max = json.events[filteredResults[i]].stats.average_price;
          }
        }
      }
    }
    
    setHighestPrice(max);
    setLowestPrice(min);
  }

  const getSoonestEvent = async(query) => {
    const response = await fetch (query);
    const json = await response.json();
    let candidate;
    
    if (click === true) {
      candidate = json.events[filteredResults[0]];
    } else {
      candidate = json.events[0];
    }
    

    if (click === false) {
      for (let i = 0; i < json.events.length; i++) {
        if ((Date.parse(json.events[i].datetime_utc)) <= 
            (Date.parse(candidate.datetime_utc))) {
          candidate = json.events[i];
        } 
      }
    } else {
      if (filteredResults.length === 0) {
        candidate = null;
      } else {
        for (let i = 0; i < filteredResults.length; i++) {
          if ((Date.parse(json.events[filteredResults[i]].datetime_utc)) <= 
              (Date.parse(candidate.datetime_utc))) {
            candidate = json.events[filteredResults[i]];
          } 
        }
      }
    }

    setSoonestEvent(candidate);
  }

  const countGenre = (genre) => {
    let count = 0;

    if (list !== null) {
      for (let i = 0; i < list.events.length; i++) {
        if (list.events[i].type === genre) {
            count++;
        } else {
          for (let j = 0; j < list.events[i].taxonomies.length; j++) {
            if (list.events[i].taxonomies[j].name === genre) {
              count++;
            }
          }
        }
        
      }
    }
    
    return count;
  }

  const cleanData = (data) => {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].value === 0) {
        data.splice(i, 1);
      }
    }
  }

  let chartData = [{name: "Sports Games", value: countGenre("sports")},
                    {name: "Theater", value: countGenre("theater")},
                    {name: "Concerts", value: countGenre("concert")},
                    {name: "Comedy Events", value: countGenre("comedy")},
                    {name: "Family Events", value: countGenre("family")}]

  cleanData(chartData);
  
  const getList = () => {
    console.log(chartData);
  }

  return (
    <>
      <div className='whole-page'>
        {/* <button onClick={getList}>test</button> */}
        <EventChart data={chartData}/>
        
        <h1>No More FOMO</h1>
        <p>An event lookup tool using the SeatGeek API.</p>
        <input
              type="text"
              placeholder="Search..."
              onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <div className="filterContainer">
          <p>Filters:</p> 
          <button onClick={filterPrices} id={pricesClicked}>Priced Lowest to Highest</button>
          <button onClick={filterConcerts} id={concertsClicked}>Concerts</button>
          <button onClick={filterSports} id={sportsClicked}>Sports</button>
          <button onClick={filterTheater} id={theaterClicked}>Theater</button>
          <button onClick={filterComedy} id={comedyClicked}>Comedy</button>
          <button onClick={resetFilter}>Reset Filters</button>
        </div>
        <br></br>
        <br></br>
        <Card 
          numEvents={list !== null && (click === false) ? 
                    "Events Listed: " + list.events.length : 
                    "Events Listed: " + filteredResults.length}
        />
        <Card 
          priceRange={(highestPrice != null) && (lowestPrice != null) ? 
                      "Price Range: $" + lowestPrice + "–$" + highestPrice 
                      : "TBD"}
        />
        <Card 
          upNext={soonestEvent != null ? "Up Next: " + 
                  (Array.from(soonestEvent.short_title).length < 20 ? 
                  "\"" + soonestEvent.short_title + "\"" 
                  : "\"" + 
                  (soonestEvent.short_title
                    .slice(0,20))
                    .concat("...") + "\"") + 
                  " – " + soonestEvent.venue.city + ", " + 
                  soonestEvent.venue.country : "TBD"}
        />

        <div className='listContainer'>
          <ul>
            <h3>Event</h3>
            {(searchInput.length > 0) || (click === true)
                ? (filteredResults.map((event) =>
                <EventInfo
                  id={list.events[event].id}
                  name={Array.from(list.events[event].short_title).length < 30 ? 
                        list.events[event].short_title 
                        : (list.events[event].short_title
                          .slice(0,30))
                          .concat("...")}
                  location={(list.events[event].venue.city) != null && 
                            (list.events[event].venue.country != null) ? 
                            " – " + list.events[event].venue.city + ", " + 
                            list.events[event].venue.country : "TBD"}
                  
                />)
              ) : (list && Object.entries(list.events).map(([event]) =>
                <EventInfo
                  id={list.events[event].id}
                  name={Array.from(list.events[event].short_title).length < 30 ? 
                        list.events[event].short_title 
                        : (list.events[event].short_title
                          .slice(0,30))
                          .concat("...")}
                  location={(list.events[event].venue.city) != null && 
                            (list.events[event].venue.country != null) ? 
                            " – " + list.events[event].venue.city + ", " + 
                            list.events[event].venue.country : "TBD"}
                  
                />)
              )
            }
          </ul>
          <ul>
            <h3>Date (UTC)</h3>
            {(searchInput.length > 0) || (click === true)
                ? (filteredResults.map((event) =>
                <EventInfo
                  id={list.events[event].id}
                  date={list.events[event].datetime_utc != null ? 
                    list.events[event].datetime_utc : "TBD"}
                  
                />)
              ) : (list && Object.entries(list.events).map(([event]) =>
                <EventInfo
                  id={list.events[event].id}
                  date={list.events[event].datetime_utc != null ? 
                    list.events[event].datetime_utc : "TBD"}
                  
                />)
              )
            }
          </ul>
          <ul>
            <h3>Average Ticket Price</h3>
            {(searchInput.length > 0) || (click === true)
                ? (filteredResults.map((event) =>
                <EventInfo
                  id={list.events[event].id}
                  price={list.events[event].stats.average_price != null ? 
                    "$" + list.events[event].stats.average_price + ".00" : "$0.00"}
                  
                />)
              ) : (list && Object.entries(list.events).map(([event]) =>
                <EventInfo
                  id={list.events[event].id}
                  price={list.events[event].stats.average_price != null ? 
                    "$" + list.events[event].stats.average_price + ".00" : "$0.00"}
                  
                />)
              )
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
