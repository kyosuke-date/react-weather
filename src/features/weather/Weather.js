import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncGetTodayData, selectDailyData } from "./weatherSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Weather = () => {
  const lists = useSelector(selectDailyData);
  const style = {
    height: "60vh",
    overflow: "auto",
  };

  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Templature</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map(({ main, weather, dt_txt }) => {
              const icon = weather[0].icon;
              const des = weather[0].description;
              return (
                <TableRow key={dt_txt}>
                  <TableCell component="th" scope="row">
                    {new Date(dt_txt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    />
                  </TableCell>
                  <TableCell align="right">{main.temp.toFixed(1)}°C</TableCell>
                  <TableCell align="right">{des}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Weather;
