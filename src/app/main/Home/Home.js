import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useState } from "react";
// import Card from "./components/Card";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import Card from './componebts/Card';

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

export default function ExamplePage(props) {
  const { t } = useTranslation("homePage");

  const [state] = useState({
    options: {
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "No. of Properties",
          "No. of Tenant",
          "No. of Landlord",
          "No. of Complaints",
        ],
      },
      colors: ["#51AB30"],
    },
    series: [
      {
        data: [30, 40, 25, 50],
      },
    ],
  });

  return (
    <Root
      header={
        <div className="p-24" style={{ paddingBottom: "10px" }}>
          <h1 style={{ fontWeight: "900" }}>{t('Home')}</h1>
        </div>
      }
      content={
        <Grid container spacing={3} sx={{display: "flex ",
        flexDirection:"column",justifyContent: "space-evenly",
        alignItems: "center", width: "100%"}}>
          {/* {/ Cards /} */}
          <Grid item lg={10} xs={12} md={6}>
            <Grid container spacing={2}>
              {/* {/ First row of cards /} */}
              <Grid item xs={4}>
                <Card />
              </Grid>
              <Grid item xs={4}>
                <Card />
              </Grid>
              <Grid item xs={4}>
                <Card />
              </Grid>

              {/* {/ Second row of cards /} */}
              <Grid item xs={4}>
                <Card />
              </Grid>
              <Grid item xs={4}>
                <Card />
              </Grid>
              <Grid item xs={4}>
                <Card />
              </Grid>
            </Grid>
          </Grid>

          {/* {/ Chart /} */}
          <Grid item xs={12} md={6}>
            <div
              style={{
                // display: "flex ",
                // flexDirection:"column",

                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="500"
              />
            </div>
          </Grid>
        </Grid>
      }
    />
  );
}
