import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import en from "../i18n/en";
import tr from "../i18n/tr";
import ar from "../i18n/ar";
import hin from "../i18n/hin";
import { useTranslation } from "react-i18next";

i18next.addResourceBundle("en", "homePage", en);
i18next.addResourceBundle("tr", "homePage", tr);
i18next.addResourceBundle("ar", "homePage", ar);

i18next.addResourceBundle("hin", "homePage", hin);

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function BasicCard({ header, number, page }) {
  const { t } = useTranslation("homePage");
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleButtonClick = () => {
    // Call navigate function with the path you want to navigate to
    navigate(`/${page}`);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          No. of Properties
        </Typography> */}
        <Typography variant="h5" component="div">
          {header}
        </Typography>

        
          <Button sx={{ color: "blue", fontSize:"40px",paddingTop:"40px"}} onClick={handleButtonClick}>
            {number}
          </Button>
       
      </CardContent>
      <CardActions>
        {/* <Button size="small" sx={{color: 'blue'}} onClick={handleButtonClick}>{t('Show_more')}</Button> */}
      </CardActions>
    </Card>
  );
}
