import React from "react";
import { useSelector } from "react-redux";
import { selectDailyData } from "./weatherSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// 表形式で天気予報を表示させる
const Weather = () => {
  const lists = useSelector(selectDailyData);
  const style = {
    height: "60vh",
    overflow: "auto",
    overflowX: "hidden",
  };

  return (
    <div style={style}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="none">Every 3 hours forecast</TableCell>
              <TableCell padding="none" align="right"></TableCell>
              <TableCell padding="none" align="right">
                Temp
              </TableCell>
              <TableCell padding="none" align="right">
                Desc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map(({ main, weather, dt_txt }) => {
              const icon = weather[0].icon;
              const des = weather[0].description;
              return (
                <TableRow key={dt_txt}>
                  <TableCell padding="none" component="th" scope="row">
                    {new Date(dt_txt).toLocaleString()}
                  </TableCell>
                  <TableCell padding="none" align="right">
                    <img
                      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                      alt="Weather Icon"
                    />
                  </TableCell>
                  <TableCell padding="none" align="right">
                    {main.temp.toFixed(1)}°C
                  </TableCell>
                  <TableCell padding="none" align="right">
                    {des}
                  </TableCell>
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
