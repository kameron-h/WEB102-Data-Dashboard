import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const EventInfo = ({name, price, date, location, id}) => {

    return (
        <>
        <div className="events">
            <li className="main-list" key={id}>
                <Link to={`/eventDetails/${id}`} key={id}>
                    {name}
                </Link>
                {location}
                {date}
                {price}
            </li>
        </div>
        </>
    );
}

export default EventInfo;