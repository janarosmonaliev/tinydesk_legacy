import React from "react";
import { Paper } from "@material-ui/core";
import WeatherWidgetStatic from "../../images/weather-widget-transparent.png";
export default function WeatherWidget() {
  return (
    <div className="weather-widget-wrapper">
      <img src={WeatherWidgetStatic}></img>
    </div>
  );
}
