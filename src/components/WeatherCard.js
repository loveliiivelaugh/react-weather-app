import React from "react";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

export default function WeatherCard({ 
  title,
  subtitle,
  date,
  temp,
  feelsLike,
  description,
  icon,
  id,
  windDirection,
  windSpeed
}) {

  function convertTemp(temp) {
    const farenheit = ( (temp *  9/5) - 459.67 );
    return farenheit;
  }
  const parsedDate = date.split(" ")[0];
  const farenheit = Math.round(convertTemp(temp));
  const feelsLikeF = Math.round(convertTemp(feelsLike));
  const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  const arrowIcons = {
    
  };

  return (
    <div className="cards">
      <Card key={id}>
        <Card.Body>
          <Card.Title>{parsedDate}</Card.Title>
          <Card.Subtitle>{title}</Card.Subtitle>
          <Image src={iconUrl} alt="weather icon" />
          <Card.Text>
            {description}
            <br />
            {farenheit} F<br />
            <small>Feels like</small> {feelsLikeF} F
            <br />
            <small>Wind</small> {windSpeed}mps | {windDirection}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}