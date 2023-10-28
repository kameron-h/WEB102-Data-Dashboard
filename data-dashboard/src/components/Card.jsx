import React, { useEffect, useState } from "react";

const Card = ({numEvents, upNext, priceRange}) => {
    
    return (
        <>
        <div className="cardContainer">
            <h3>{numEvents}</h3>
            <h3>{upNext}</h3>
            <h3>{priceRange}</h3>
        </div>
        </>
    );
}

export default Card;