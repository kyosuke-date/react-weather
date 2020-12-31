import React from "react";
import { selectDailyData } from "./weatherSlice";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    justifyContent: "flex-start",
    minHeight: "300px",
  },
});

// 気温と体感温度の推移のLineChart作成
const TempLine = () => {
  const classes = useStyles();
  const list = useSelector(selectDailyData);
  const dates = list.map(({ dt_txt }) => dt_txt);
  const temps = list.map(({ main }) => main);
  const correctDate = dates.filter((date, index) => {
    if (index < 16) return date;
  });
  const tempData = temps.filter((temp, index) => {
    if (index < 16) return temp;
  });

  return (
    <div className={classes.root}>
      <Line
        data={{
          labels: correctDate.map((date) => new Date(date).toLocaleString()),
          datasets: [
            {
              data: tempData.map(({ feels_like }) => feels_like),
              label: "体感温度",
              borderColor: "#3333ff",
              fill: false,
            },
            {
              data: tempData.map((temp) => temp.temp),
              label: "気温",
              borderColor: "#ff3370",
              fill: false,
            },
          ],
        }}
        options={{
          title: { display: true, text: `気温と体感温度の推移` },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default TempLine;
