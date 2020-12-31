import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";

import SwitchPref from "./SwitchPref";
import TempCard from "./TempCard";
import TempLine from "./TempLine";
import Weather from "./Weather";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 77,
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

// ダッシュボードライクな見た目を作る
const DashBoard = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Weather Forecast Live DashBoard @Japan
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.content}>
        <div className={classes.container}>
          <SwitchPref />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TempCard />
          </Grid>
          <Grid item xs={12} md={7}>
            <TempLine />
          </Grid>
          <Grid item xs={12} md={5}>
            <Weather />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoard;
