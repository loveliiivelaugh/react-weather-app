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

  const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
  const arrowIcons = {

  }

  return (
    <div className="cards">
      <Card key={id}>
        <Image src={iconUrl} alt="weather icon" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>
            {description}
            <br />
            Temperature: {temp} | Feels like:{feelsLike}
            <br />
            Wind: {windSpeed} | {windDirection}
            <br />
            Date: {date}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}