import React from "react";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import MainPane from "./MainPane";
import { Grid } from "@material-ui/core";
import { FormatAlignJustify } from "@material-ui/icons";

const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
};

export default props => {
  return (
    <Grid container>
      <Grid item xs={12} md={1} >
        <LeftPane styles={styles}/>
      </Grid>
      <Grid item xs={12} md={11}>
        <MainPane styles={styles}/>
      </Grid>
      {/* <Grid item xs={12} md={1}>
        <RightPane styles={styles}/>
      </Grid> */}
    </Grid>
  );
}