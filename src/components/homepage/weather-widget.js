import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import ReactAnimatedWeather from "react-animated-weather";

import CircularProgress from "@material-ui/core/CircularProgress";

const CurrentTemp = styled.div`
  font-size: 40px;
  color: white;
  text-align: left;
  margin-top: 10px;
`;
const SubTitle = styled.div`
  font-size: 12px;
  color: white;
  text-align: left;
`;

const Title = styled.div`
  height: 30%;
  font-weight: bold;
  font-size: 20px;
  color: white;
  text-align: left;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const Time = styled.div`
  height: 30%;
  font-weight: normal;
  font-size: 18px;
  color: white;
  text-align: right;
`;

const formatTime = (date, next = 0) => {
  var hours = date.getHours() + next;
  var min = date.getMinutes();
  const meridiem = hours >= 12 ? (hours >= 24 ? "AM" : "PM") : "AM";
  hours %= 12;
  hours = hours ? hours : 12;
  min = min < 10 ? "0" + min : min;

  return [hours, min, meridiem];
};

export default function WeatherWidget() {
  const numberOfForecast = [0, 1, 2, 3];
  const [weathers, setWeathers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(formatTime(new Date()));
  const getHourlyUpdate = (param) => {
    switch (param) {
      case "Rain":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"RAIN"}
              color={"gray"}
              size={50}
              animated={true}
            />
          </div>
        );
      case "Clouds":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"CLOUDY"}
              color={"gray"}
              size={50}
              animated={true}
            />
          </div>
        );
      case "Clear":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"CLEAR_DAY"}
              color={"yellow"}
              size={50}
              animated={true}
            />
          </div>
        );

      case "Snow":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"SNOW"}
              color={"white"}
              size={50}
              animated={true}
            />
          </div>
        );
      case "Thunderstorm":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"CLOUDY"}
              color={"gray"}
              size={50}
              animated={true}
            />
          </div>
        );
      case "Mist":
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"FOG"}
              color={"gray"}
              size={50}
              animated={true}
            />
          </div>
        );
      default:
        return (
          <div style={{ marginTop: "10px" }}>
            <ReactAnimatedWeather
              icon={"CLEAR_DAY"}
              color={"gray"}
              size={50}
              animated={true}
            />
          </div>
        );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/onecall?lat=37.583328&lon=127.0&exclude=minutely&appid=450f67b03a3b2668b965c9b3ce364941&units=metric"
        );
        setWeathers(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date()), 10000));
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (loading) {
    return (
      <div className="weather-widget-wrapper" style={{ height: "155px" }}>
        <Grid item xs={12} container justify="center">
          <CircularProgress
            size={50}
            thickness={8.0}
            style={{ marginTop: "43px" }}
          />
        </Grid>
      </div>
    );
  }
  if (!weathers) {
    return null;
  }

  //Update Time on change in time
  return (
    <div className="weather-widget-wrapper">
      <Grid
        item
        xs={12}
        container
        style={{
          borderRadius: "15px",

          maxWidth: "100%",
          minWidth: "300px",
          padding: "20px 20px 20px 20px",
        }}
      >
        <Grid item xs={6}>
          <Title>Songdo, Incheon</Title>
        </Grid>
        <Grid item xs={6}>
          <Time>{time[0] + ":" + time[1] + time[2]}</Time>
        </Grid>

        <Grid item xs={12}>
          <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
        </Grid>
        <Grid item xs={4} direction="column" justify="space-between" container>
          <CurrentTemp>{parseInt(weathers.current.temp)}&#8451;</CurrentTemp>
          <SubTitle>{weathers.current.weather[0].main}</SubTitle>
        </Grid>
        {numberOfForecast.map((i) => (
          <Grid
            item
            container
            xs={2}
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            {getHourlyUpdate(weathers.hourly[i].weather[0].main)}
            <SubTitle>
              {formatTime(new Date(), i + 1)[0] +
                formatTime(new Date(), i + 1)[2]}
            </SubTitle>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
