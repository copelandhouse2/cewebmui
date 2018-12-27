import React from "react";
import { Paper, TextField } from "@material-ui/core";

export default ({ styles }) => {
  return (
    <Paper style={styles.Paper}>
      <Paper style={styles.Paper}>
        <form>
        <TextField
          id="client"
          label="Client"
          placeholder="Client Please"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
          md={3}
          xs={12}
        />
        <TextField
          id="owner"
          label="Owner"
          placeholder="Owner Please"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
          md={3}
          xs={12}
        />
        <TextField
          id="sub"
          label="Subdivision"
          placeholder="Subdivision Please"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
          md={3}
          xs={12}
        />
        <TextField
          id="city"
          label="City"
          placeholder="City Please"
          // className={classes.textField}
          // value={this.state.name}
          // onChange={this.handleChange('name')}
          margin="normal"
          md={3}
          xs={12}
        />
        </form>
      </Paper>
      <Paper style={styles.Paper}>
        Middle Pane
      </Paper>
      <Paper style={styles.Paper}>
        Bottom Pane
      </Paper>
    </Paper>
  );
}