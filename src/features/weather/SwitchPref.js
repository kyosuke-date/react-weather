import React, { useState } from "react";
import {
  NativeSelect,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  fetchAsyncGetZipTodayData,
  fetchAsyncGetZipDailyData,
  fetchAsyncGetTodayData,
  fetchAsyncGetDailyData,
} from "./weatherSlice";
import { FaPaperPlane } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
  root: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  icon: {
    pading: 0,
    margin: "15px 0 0 0",
    fontSize: 18,
  },
}));

const SwitchPref = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [zip, setZip] = useState("");

  const prefs = [
    { en: "Hokkaido", ja: "北海道" },
    { en: "Aomori", ja: "青森県" },
    { en: "Iwate", ja: "岩手県" },
    { en: "Miyagi", ja: "宮城県" },
    { en: "Akita", ja: "秋田県" },
    { en: "Yamagata", ja: "山形県" },
    { en: "Fukushima", ja: "福島県" },
    { en: "Ibaraki", ja: "茨城県" },
    { en: "Tochigi", ja: "栃木県" },
    { en: "Gunma", ja: "群馬県" },
    { en: "Saitama", ja: "埼玉県" },
    { en: "Chiba", ja: "千葉県" },
    { en: "Tokyo", ja: "東京都" },
    { en: "Kanagawa", ja: "神奈川県" },
    { en: "Nigata", ja: "新潟県" },
    { en: "Toyama", ja: "富山県" },
    { en: "Ishikawa", ja: "石川県" },
    { en: "Fukui", ja: "福井県" },
    { en: "Yamanashi", ja: "山梨県" },
    { en: "Nagano", ja: "長野県" },
    { en: "Gifu", ja: "岐阜県" },
    { en: "Shizuoka", ja: "静岡県" },
    { en: "Aichi", ja: "愛知県" },
    { en: "Mie", ja: "三重県" },
    { en: "Shiga", ja: "滋賀県" },
    { en: "Kyoto", ja: "京都府" },
    { en: "Osaka", ja: "大阪府" },
    { en: "Hyogo", ja: "兵庫県" },
    { en: "Nara", ja: "奈良県" },
    { en: "Wakayama", ja: "和歌山県" },
    { en: "Tottori", ja: "鳥取県" },
    { en: "Shimane", ja: "島根県" },
    { en: "Okayama", ja: "岡山県" },
    { en: "Hiroshima", ja: "広島県" },
    { en: "Yamaguchi", ja: "山口県" },
    { en: "Tokushima", ja: "徳島県" },
    { en: "Kagawa", ja: "香川県" },
    { en: "Ehime", ja: "愛媛県" },
    { en: "Kochi", ja: "高知県" },
    { en: "fukuoka", ja: "福岡県" },
    { en: "Saga", ja: "佐賀県" },
    { en: "Nagasaki", ja: "長崎県" },
    { en: "Kumamoto", ja: "熊本県" },
    { en: "Oita", ja: "大分県" },
    { en: "Miyagi", ja: "宮城県" },
    { en: "Kagoshima", ja: "鹿児島県" },
    { en: "Okinawa", ja: "沖縄県" },
  ];

  return (
    <>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={(e) => {
            dispatch(fetchAsyncGetTodayData(e.target.value));
            dispatch(fetchAsyncGetDailyData(e.target.value));
          }}
        >
          <option value="">県名で検索</option>
          {prefs.map(({ en, ja }, id) => (
            <option key={id} value={en}>
              {ja}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl>
        <div className={classes.root}>
          <TextField
            id="standard-required"
            label="郵便番号で検索"
            placeholder="000-0000"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <Button
            onClick={() => {
              dispatch(fetchAsyncGetZipTodayData(zip));
              dispatch(fetchAsyncGetZipDailyData(zip));
            }}
            disabled={!zip}
          >
            <FaPaperPlane className={classes.icon} />
          </Button>
        </div>
      </FormControl>
    </>
  );
};

export default SwitchPref;
