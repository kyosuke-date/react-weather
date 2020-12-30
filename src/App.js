import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodayData,
  fetchAsyncGetTodayData,
  fetchAsyncGetZipTodayData,
  fetchAsyncGetZipDailyData,
  fetchAsyncGetDailyData,
} from "./features/weather/weatherSlice";
import SwitchPref from "./features/weather/SwitchPref";
import TempCard from "./features/weather/TempCard";
import axios from "axios";
import TempLine from "./features/weather/TempLine";
import Weather from "./features/weather/Weather";

function App() {
  const dispatch = useDispatch();
  const todayData = useSelector(selectTodayData);

  React.useEffect(() => {
    const reset = () => {
      dispatch(fetchAsyncGetTodayData("Tokyo"));
      dispatch(fetchAsyncGetDailyData("Tokyo"));
    };
    return reset();
  }, [dispatch]);

  const getData = async () => {
    const data = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast/?zip=150-0002,jp&units=metric&lang=ja&APPID=ab71513f3662eea8e0617947835b0c9c"
    );
    // const { list, city } = data;
    // const lis = list;
    console.log(data);
    // console.log(lis);
    // console.log(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SwitchPref />
        <TempCard />
        <TempLine />
        <Weather />
      </header>
    </div>
  );
}

export default App;

// http://api.openweathermap.org/data/2.5/forecast/daily?id=1850147&units=metric&cnt=3&appid=ab71513f3662eea8e0617947835b0c9c
// http://api.openweathermap.org/data/2.5/forecast/?id=1850147&units=metric&cnt=8&appid=ab71513f3662eea8e0617947835b0c9c
