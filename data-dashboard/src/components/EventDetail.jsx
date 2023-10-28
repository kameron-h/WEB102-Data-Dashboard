import React, { Component, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "/routes/NotFound";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const EventDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

useEffect(() => {
    const getEventDetails = async () => {
        const event = await fetch(`https://api.seatgeek.com/2/events/?id=${params.id}&client_id=${API_KEY}`);
        const eventJson = await event.json();
        
        setFullDetails({"event": eventJson.events[0], 
                        "prices": eventJson.events[0].stats, 
                        "performers": eventJson.events[0].performers[0],
                        "venue": eventJson.events[0].venue,
                        "genre": eventJson.events[0].taxonomies[0]});
    };
    
    getEventDetails().catch(console.error);
  }, []);

  const getJson = () => {
    console.log(fullDetails.event);
  }

  return (
    <>
    {/* <button onClick={getJson}>test</button> */}
    <h1>{fullDetails != null ? fullDetails.event.title : null}</h1>
    <img
        className="images"
        src={fullDetails != null ? fullDetails.performers.image : null}
        alt={fullDetails != null ? `Performer image for ${fullDetails.performers.short_name}` : null}
    />
    <div> {fullDetails != null ? fullDetails.event.description : null}</div>
    <br></br>
    <div>
        Get your tickets{" "}
        <a href={fullDetails != null ? (fullDetails.event.url !== "" ? fullDetails.event.url : "(TBD)") : null}>
            here!{" "}
        </a>
    </div>
    <br></br>
    <table>
        <tbody> 
            <tr>
                <th>Event Date </th>
                <td>{fullDetails != null ? (fullDetails.event.datetime_utc !== "" ? fullDetails.event.datetime_utc : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Location </th>
                <td>{fullDetails != null ? 
                    (fullDetails.venue.display_location !== "" ? fullDetails.venue.display_location : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Address </th>
                <td>{fullDetails != null ? 
                    (fullDetails.venue.address !== "" ? fullDetails.venue.address : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Venue </th>
                <td>{fullDetails != null ? 
                    (fullDetails.venue.name !== "" ? fullDetails.venue.name : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Lowest Price </th>
                <td>{fullDetails != null ? 
                    (fullDetails.prices.lowest_price !== "" ? "$" + fullDetails.prices.lowest_price : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Highest Price </th>
                <td>{fullDetails != null ? 
                    (fullDetails.prices.highest_price !== "" ? "$" + fullDetails.prices.highest_price : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Average Price </th>
                <td>{fullDetails != null ? 
                    (fullDetails.prices.average_price !== "" ? "$" + fullDetails.prices.average_price : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Genre </th>
                <td>{fullDetails != null ? 
                    (fullDetails.genre.name !== "" ? fullDetails.genre.name : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Announce Date </th>
                <td>{fullDetails != null ? 
                    (fullDetails.event.announce_date !== "" ? fullDetails.event.announce_date : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Visible Until </th>
                <td>{fullDetails != null ? 
                    (fullDetails.event.visible_until_utc !== "" ? fullDetails.event.visible_until_utc : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Event Score </th>
                <td>{fullDetails != null ? 
                    (fullDetails.event.score !== "" ? fullDetails.event.score : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Performer Score </th>
                <td>{fullDetails != null ? 
                    (fullDetails.performers.score !== "" ? fullDetails.performers.score : "(TBD)") : null}</td>
            </tr>
            <tr>
                <th>Venue Score </th>
                <td>{fullDetails != null ? 
                    (fullDetails.venue.score !== "" ? fullDetails.venue.score : "(TBD)") : null}</td>
            </tr>
        </tbody>
    </table>
    </>
  );
}

export default EventDetail;