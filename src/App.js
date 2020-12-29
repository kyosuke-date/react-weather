import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodayData,
  fetchAsyncGetTodayData,
} from "./features/weather/weatherSlice";
import SwitchPref from "./features/weather/SwitchPref";
// import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const todayData = useSelector(selectTodayData);

  React.useEffect(() => {
    const reset = () => dispatch(fetchAsyncGetTodayData("Tokyo"));
    return reset();
  }, [dispatch]);

  const icon = todayData.weather[0].icon;
  const temp = todayData.main.temp.toFixed(1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SwitchPref />
        <p>{todayData.weather[0].description}</p>
        <p>{temp}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather Icon"
        />
      </header>
    </div>
  );
}

export default App;

// http://api.openweathermap.org/data/2.5/forecast/daily?id=1850147&units=metric&cnt=3&appid=ab71513f3662eea8e0617947835b0c9c
// http://api.openweathermap.org/data/2.5/forecast/?id=1850147&units=metric&cnt=8&appid=ab71513f3662eea8e0617947835b0c9c
