import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncGetTodayData,
  fetchAsyncGetDailyData,
} from "./features/weather/weatherSlice";
import DashBoard from "./features/weather/DashBoard";

function App() {
  const dispatch = useDispatch();

  // クエリ Tokyo で初期化処理
  React.useEffect(() => {
    const reset = () => {
      dispatch(fetchAsyncGetTodayData("Tokyo"));
      dispatch(fetchAsyncGetDailyData("Tokyo"));
    };
    return reset();
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <DashBoard />
      </header>
    </div>
  );
}

export default App;
