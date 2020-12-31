import React from "react";
import { useSelector } from "react-redux";
import {
  selectTodayData,
  selectPrefname,
  selectPrefKana,
} from "./weatherSlice";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 8,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 20px",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

// 地名、気温、説明、アイコンを表示するカードを作成
const TempCard = () => {
  const todayData = useSelector(selectTodayData);
  const prefname = useSelector(selectPrefname);
  const prefkana = useSelector(selectPrefKana);
  const icon = todayData.weather[0].icon;
  const temp = todayData.main.temp.toFixed(1);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {!prefkana ? prefname : prefkana}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {temp}°C
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {todayData.weather[0].description}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        title="Weather Icon"
      />
    </Card>
  );
};

export default TempCard;
