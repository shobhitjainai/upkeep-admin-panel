import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getadminLandlords } from "../../../../app/store/admin/adminLandlordSlice";
import { getadminTenants } from "app/store/admin/adminTenantSlice";
import { getadminRepairers } from "app/store/admin/adminRepairerSlice";
import { getadminProperties } from "app/store/admin/adminPropertySlice";

const access_token = localStorage.getItem("jwt_access_token");

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
  const dispatch = useDispatch();
  const { adminLandlords } = useSelector((state) => state.admin.adminLandlord);
  const { adminTenants } = useSelector((state) => state.admin.adminTenant);
  const { adminProperties } = useSelector((state) => state.admin.adminProperty);
  const { adminRepairers } = useSelector((state) => state.admin.adminRepairer);

  const cardData = [
    {
      header: t("NO_OF_PROPERTY"),
      number: adminProperties.length,
      page: "property",
    },
    { header: t("NO_OF_TENANT"), number: adminTenants.length, page: "tenant" },
    {
      header: t("NO_OF_LANDLORD"),
      number: adminLandlords.length,
      page: "landlord",
    },
    { header: t("NO_OF_COMPLAINTS"), number: 5, page: "home" },
    {
      header: t("NO_OF_Repairers"),
      number: adminRepairers.length,
      page: "home",
    },
    { header: t("Booked_Properties"), number: 11, page: "home" },
  ];

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

  const getAllDetails = (access_token) => {
    dispatch(getadminLandlords(access_token));
    dispatch(getadminProperties(access_token));
    dispatch(getadminTenants(access_token));
    dispatch(getadminRepairers(access_token));
  };

  useEffect(() => {
    getAllDetails(access_token);
  }, []);

  return (
    <Root
      header={
        <div className="p-24" style={{ paddingBottom: "10px" }}>
          <h1 style={{ fontWeight: "900" }}>{t("Home")}</h1>
        </div>
      }
      content={
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginTop: "3%",
          }}
        >
          <Grid item lg={10} xs={12} md={6}>
            <Grid container spacing={2}>
              {cardData.map((data, index) => (
                <Grid item xs={4} key={index}>
                  <Card
                    header={data.header}
                    number={data.number}
                    page={data.page}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginTop: "2%",
              }}
            >
              <h1
                style={{
                  marginTop: "3%",
                  fontWeight: "600",
                  marginBottom: "3%",
                }}
              >
                {t("Graphical_Representation")}
              </h1>
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="550"
                height="400"
              />
            </div>
          </Grid>
        </Grid>
      }
    />
  );
}
