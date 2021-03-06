import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const dateUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const dateZipUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const dailyUrl = "http://api.openweathermap.org/data/2.5/forecast/?q=";
const dailyZipUrl = "https://api.openweathermap.org/data/2.5/forecast/?zip=";
const apiKey = "&units=metric&lang=ja&appid=ab71513f3662eea8e0617947835b0c9c";

// 初期値
const initialState = {
  todayData: {
    coord: {
      lon: 139.71,
      lat: 35.66,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02n",
      },
    ],
    base: "stations",
    main: {
      temp: 7.66,
      feels_like: 3.42,
      temp_min: 6.11,
      temp_max: 9,
      pressure: 1022,
      humidity: 76,
    },
    visibility: 10000,
    wind: {
      speed: 4.1,
      deg: 50,
    },
    clouds: {
      all: 20,
    },
    dt: 1609076604,
    sys: {
      type: 1,
      id: 8074,
      country: "JP",
      sunrise: 1609019371,
      sunset: 1609054480,
    },
    timezone: 32400,
    id: 0,
    name: "Shibuya",
    cod: 200,
  },
  dailyData: [
    {
      dt: 1609221600,
      main: {
        temp: 12.09,
        feels_like: 9.14,
        temp_min: 12.09,
        temp_max: 12.28,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 1011,
        humidity: 53,
        temp_kf: -0.19,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 86,
      },
      wind: {
        speed: 2.02,
        deg: 57,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2020-12-29 06:00:00",
    },
  ],
  prefname: "Tokyo",
  prefKana: "東京都",
  zipcode: "",
};

// 地名で現在の天候のAPI取得
export const fetchAsyncGetTodayData = createAsyncThunk(
  "weather/getToday",
  async (city) => {
    const { data } = await axios
      .get(`${dateUrl}${city},jp${apiKey}`)
      .catch((err) => console.log(err));
    return { data, city };
  }
);

// 地名で3時間ごと５日分のAPI取得
export const fetchAsyncGetZipTodayData = createAsyncThunk(
  "weather/getZipToday",
  async (zip) => {
    const { data } = await axios
      .get(`${dateZipUrl}${zip},jp${apiKey}`)
      .catch((err) => console.log(err));
    return { data, zip };
  }
);

// 郵便番号で現在の天候のAPI取得
export const fetchAsyncGetDailyData = createAsyncThunk(
  "weather/getDaily",
  async (city) => {
    const { data } = await axios
      .get(`${dailyUrl}${city},jp${apiKey}`)
      .catch((err) => console.log(err));
    return { data, city };
  }
);

// 郵便番号で3時間ごと５日分のAPI取得
export const fetchAsyncGetZipDailyData = createAsyncThunk(
  "weather/getZipDaily",
  async (zip) => {
    const { data } = await axios
      .get(`${dailyZipUrl}${zip},jp${apiKey}`)
      .catch((err) => console.log(err));
    return { data, zip };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetTodayData.fulfilled, (state, action) => {
      return {
        ...state,
        todayData: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetZipTodayData.fulfilled, (state, action) => {
      return {
        ...state,
        todayData: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetDailyData.fulfilled, (state, action) => {
      const { list, city } = action.payload.data;
      return {
        ...state,
        dailyData: list,
        prefname: action.payload.city,
        prefKana: city.name,
        zipcode: "",
      };
    });
    builder.addCase(fetchAsyncGetZipDailyData.fulfilled, (state, action) => {
      const { list, city } = action.payload.data;
      return {
        ...state,
        dailyData: list,
        zipcode: action.payload.zip,
        prefname: city.name,
        prefKana: "",
      };
    });
  },
});

export const selectTodayData = (state) => state.weather.todayData;
export const selectDailyData = (state) => state.weather.dailyData;
export const selectPrefname = (state) => state.weather.prefname;
export const selectPrefKana = (state) => state.weather.prefKana;
export const selectZipcode = (state) => state.weather.zipcode;

export default weatherSlice.reducer;
