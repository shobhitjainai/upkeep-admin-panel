import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";

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
  const { adminLandlords, loading } = useSelector((state) => state.admin.adminLandlord);
  const { adminTenants } = useSelector((state) => state.admin.adminTenant);
  const { adminProperties  } = useSelector((state) => state.admin.adminProperty);
  const { adminRepairers  } = useSelector((state) => state.admin.adminRepairer);

  const [seriesData, setSeriesData] = useState([]);

  const cardData = [
    {
      header: t("NO_OF_PROPERTY"),
      number: adminProperties.length,
      page: "adminproperty",
    },
    { header: t("NO_OF_TENANT"), number: adminTenants.length, page: "admintenant" },
    {
      header: t("NO_OF_LANDLORD"),
      number: adminLandlords.length,
      page: "adminlandlord",
    },
    { header: t("NO_OF_COMPLAINTS"), number: 5, page: "home" },
    {
      header: t("NO_OF_REPAIRER"),
      number: adminRepairers.length,
      page: "adminrepairer",
    },
    { header: t("Booked_Properties"), number: 11, page: "home" },
  ];

  const rightSideCard = [
    { header: t("NO_OF_COMPLAINTS"), number: 5, page: "home" },
    { header: t("Booked_Properties"), number: 11, page: "home" },
  ]

  const options = {
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "No. of Properties",
        "No. of Tenant",
        "No. of Landlord",
        "No. of Repairers",
      ],
    },
    colors: ["#51AB30"],
    tooltip: {
      enabled: true,
      y: {
        formatter: function(value) {
          return value; // You can customize the formatting here if needed
        },
        title: {
          formatter: function(seriesName) {
            return ""; // Set an empty string to remove the default "series-1" label
          }
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getadminLandlords(access_token));
      await dispatch(getadminProperties(access_token));
      await dispatch(getadminTenants(access_token));
      await dispatch(getadminRepairers(access_token));
    };

    fetchData();
  }, [dispatch]); // Only run the effect when dispatch changes

  useEffect(() => {
    // Update series data when Redux store values change
    setSeriesData([
      adminProperties.length,
      adminTenants.length,
      adminLandlords.length,
      adminRepairers.length,
    ]);
  }, [adminProperties.length, adminTenants.length, adminLandlords.length, adminRepairers.length]);

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
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginTop: "3%",
            flexWrap: "nowrap"
          }}
        >
          <Grid sx={{ flexDirection: "column", flexWrap: "wrap" }}
            item className="w-2/5" >
            <Grid sx={{ display: 'flex', flexDirection: 'row' , flexWrap: 'wrap'}} container spacing={2} >
              {cardData.map((data, index) => (
                <Grid item xs={6} key={index} className="w-2/5"> {/* Changed xs={4} to xs={6} */}
                  <Card
				  className= "w-1/6"
                    header={data.header}
                    number={data.number}
                    page={data.page}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} className="w-3/4 flex flex-col gap-8">
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                marginTop: "2%",
              }}
            >
				<Grid >
              <h1
                style={{
                  marginTop: "3%",
                  fontWeight: "600",
                  marginBottom: "3%",
                }}
              >
                {t("Graphical_Representation")}
              </h1></Grid>
			  <Grid >
              {loading ? <FuseLoading /> : (
                <Chart
                  options={options}
                  series={[{ data: seriesData }]}
                  type="bar"
                  width="550"
                  height="400"
                />)}
				</Grid>
            </div>

          </Grid>
        </Grid>
      }
    />
  );
}
