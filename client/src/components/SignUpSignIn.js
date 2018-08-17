import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SignUpSignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      showPassword: false,
      role: "",
      client: "",
      access_approved: false,
      tab: 0
    };

    this._initState = {...this.state};

  }

  componentDidMount() {

  }

  handleSubmit = event => {
    // event.preventDefault();
    // this.props.onSignup(this.state);
    console.log("In the handleSubmit")
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleTab = (event, value) => {
    console.log("In handleTab");
    this.setState({ tab: value });
  };

  signUpForm = () => {
    return (
      <div>
        <DialogContent>
          <TextField
            id="email"
            label="Email Address"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleChange("email")}
            fullWidth
            autoFocus
          />

         <FormControl>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onMouseDown={this.handleClickShowPassword}
                    onMouseUp={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
            <Input
              id="adornment-password-confirm"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password_confirm}
              onChange={this.handleChange("password_confirm")}
            />
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleSubmit} variant="contained" color="secondary">
            Login
          </Button>
        </DialogActions>
      </div>
    )
  }

  signInForm = () => {
    return (
      <div>
        <DialogContent>
          <TextField
            id="email"
            label="Email Address"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleChange("email")}
            fullWidth
            autoFocus
          />

         <FormControl>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onMouseDown={this.handleClickShowPassword}
                    onMouseUp={this.handleClickShowPassword}

                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleSubmit} variant="contained" color="secondary">
            Login
          </Button>
        </DialogActions>
      </div>
    )
  }
  render() {

    console.log("email", this.state.email);
    console.log("password", this.state.password);
    const { classes } = this.props;

    return (
      <Dialog 
      open 
      onRequestClose={this.props.toggleLogin}
      fullScreen={this.props.fullScreen} >
      <DialogTitle>Copeland Engineering Web Tools</DialogTitle>

      <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={this.state.tab} onChange={this.handleTab} fullWidth>
          <Tab label="Sign In" />
          <Tab label="Sign Up" href="#basic-tabs" />
        </Tabs>
      </AppBar>
      {this.state.tab === 0 && this.signInForm()}
      {this.state.tab === 1 && this.signUpForm()}
    </div>
    </Dialog>
    );
  }

  // render() {

  //   return (

  //     <Card>
  //       <CardHeader title="Copeland Engineering" subheader="Login"/>
  //       <CardContent>
  //         <TextField
  //           id="with-placeholder"
  //           label="Username"
  //           placeholder="Username"
  //           margin="normal"
  //         />

          // <FormControl>
          //   <InputLabel htmlFor="adornment-password">Password</InputLabel>
          //   <Input
          //     id="adornment-password"
          //     type={this.state.showPassword ? "text" : "password"}
          //     value={this.state.password}
          //     onChange={this.handleChange("password")}
          //     endAdornment={
          //       <InputAdornment position="end">
          //         <IconButton
          //           aria-label="Toggle password visibility"
          //           onClick={this.handleClickShowPassword}
          //           onMouseDown={this.handleMouseDownPassword}
          //         >
          //           {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
          //         </IconButton>
          //       </InputAdornment>
          //     }
          //   />
          // </FormControl>
          
  //         <Button onClick={this.props.toggleLogin} variant="contained" color="secondary">
  //           Login
  //         </Button>
  //       </CardContent>
  //     </Card>

  //   );
  // }

}
export default withStyles(styles)(SignUpSignIn);
