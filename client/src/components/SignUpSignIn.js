import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AlertDialogContainer from "../containers/AlertDialogContainer";
// import { resolve } from "url";
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    // color: "white",
    // backgroundColor: "black",
    // borderRadius: 10,
    // textShadow: 5,
    // width: 100,
    marginTop: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
});

class SignUpSignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      password_confirm: "",
      showPassword: false,
      role: "",
      client: "",
      approved: '',
      tab: 0,
      showError: false,
      errTitle: "",
      errContent: ""
    };

    this._initState = {...this.state};

  }

  componentDidMount() {
    this.props.getLookup("ROLE");
  }

  handleSignUp = () => {
    // console.log("In the handleSignUp");

    // if statement contains syntax validations for login info:
    //   a) must contain email and password
    //   b) password and the confirmation password must match
    //   c) email must be properly formatted.  Must contain a @ and a dot (.)

    if ( !this.state.email || !this.state.password ) {
      this.props.loadMessage(
        { ok:false,
          status: 401,
          statusText: "Username or password empty.  Please include"
        }, "ERROR");
    } else if ( this.state.password !== this.state.password_confirm ) {
      this.props.loadMessage(
        { ok:false,
          status: 401,
          statusText: "Confirmation password does not match.  Please correct"
        }, "ERROR");
    } else if ( this.state.email.lastIndexOf(".") === -1 || this.state.email.lastIndexOf("@") === -1 ) {
      this.props.loadMessage(
        { ok:false,
          status: 401,
          statusText: "Email not formatted correctly.  Please review."
        }, "ERROR");
    } else {
        this.setState({ approved: 'PENDING' }, () => {
          this.props.signUp(this.state);
        });

      // const promiseRes = Promise.resolve(this.props.signUp(this.state));
      // promiseRes.then(theResponse => {
      //   console.log("handle Submit", this.props.message, theResponse);
      // });

      // new Promise((resolve) => {
      //   resolve(this.props.signUp(this.state));
      // }).then( theResponse => {
      //     console.log("handle Submit", this.props.message, theResponse);
      // });
      // theResponse.then((r) => console.log(r));

      // if ( !false ) {
      //   console.log("In the handleSubmit, if statement")
      //   // this.setState({ showError: true, errTitle: `Error # ${theResponse.status}`
      //   // , errContent: `${theResponse.statusText}` });
      //   // this.setState({ showError: true, errTitle: `Error # 422`
      //   , errContent: `Yikes` });
      // } else {
      //   console.log("In the handleSubmit, else statement")
      //   alert("Good Submit")
      // }

    }
  }

  handleSignIn = () => {
    // console.log("In the handleSignIn", this.state);
    if ( !this.state.email || !this.state.password ) {
      this.props.loadMessage(
        { ok:false,
          status: 401,
          statusText: "Username or password empty.  Please include"
        }, "ERROR");
    } else if ( this.state.email.lastIndexOf(".") === -1 || this.state.email.lastIndexOf("@") === -1 ) {
      this.props.loadMessage(
        { ok:false,
          status: 401,
          statusText: "Email not formatted correctly.  Please review."
        }, "ERROR");
    } else {
      this.props.signIn(this.state);
    }
  }

  onMessageAck = () => {
    this.setState({ showError: false, errTitle: "", errContent: "" });
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
    this.setState({ tab: value });
  };

  signUpForm = () => {
    const { classes } = this.props;

    return (

      <form className={classes.container} noValidate autoComplete="off">
        <DialogContent>
          <TextField
            id="email"
            label="Email (Username)"
            type="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            fullWidth
            autoFocus
            // className={classes.textField}
            margin="normal"
            // InputProps={{ className: classes.textfield }}
            // InputLabelProps={{ className: classes.label }}
            variant="outlined"
          />

          <Grid container>
          <Grid item sm={5}>
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            margin="normal"
            value={this.state.firstName}
            onChange={this.handleChange("firstName")}
            fullWidth
          />
          </Grid>
          <Grid item sm={1} />
          <Grid item sm={6}>
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            margin="normal"
            value={this.state.lastName}
            onChange={this.handleChange("lastName")}
            fullWidth
          />
          </Grid>

          <Grid item sm={5}>
          <TextField
            id="mobile"
            label="Mobile"
            type="tel"
            margin="normal"
            value={this.state.mobile}
            onChange={this.handleChange("mobile")}
            fullWidth
          />
          </Grid>
          <Grid item sm={1} />
          <Grid item sm={6}>
          <TextField
            id="role"
            select
            label="Role"
            type="text"
            margin="normal"
            value={this.state.role}
            onChange={this.handleChange("role")}
            fullWidth
          >
            {this.props.roleLookup.map(option => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
            </MenuItem>
            ))}
          </TextField>
          </Grid>
          <Grid item sm={5}>
         <FormControl
            fullWidth
            className={classes.textField}
          >
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
          </FormControl>
          </Grid>
          <Grid item sm={1} />
          <Grid item sm={6}>
          <FormControl
            fullWidth
            className={classes.textField}
          >
            <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
            <Input
              id="adornment-password-confirm"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password_confirm}
              onChange={this.handleChange("password_confirm")}
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
              fullWidth
            />
          </FormControl>
          </Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Button
            onClick = {this.handleSignUp}
            variant = "contained" color="secondary"
          >
            Login
          </Button>
        </DialogActions>
      </form>
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
          <Button onClick={this.handleSignIn}
            variant="contained" color="secondary">
            Login
          </Button>
        </DialogActions>
      </div>
    )
  }

  // showMessageDialog = () => {
  //   if (!this.props.message.ok) {
  //     return (<AlertDialog
  //     showMsg={!this.props.message.ok}
  //     onMessageAck = {this.onMessageAck}
  //     msgTitle = {this.props.message.status}
  //     msgContent = {this.props.message.content}
  //     />);
  //   }
  //   return (<div />);
  // }

  render() {

    // console.log("state", this.state);
    // console.log("message", this.props.message);
    const { classes } = this.props;

    return (
      <Dialog
        open
        fullScreen={this.props.fullScreen}
      >
        <DialogTitle>Copeland Engineering Web Tools</DialogTitle>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={this.state.tab} onChange={this.handleTab} variant='fullWidth'>
              <Tab label="Sign In" />
              <Tab label="Sign Up" href="#basic-tabs" />
            </Tabs>
          </AppBar>
          {this.state.tab === 0 && this.signInForm()}
          {this.state.tab === 1 && this.signUpForm()}
        </div>
        <AlertDialogContainer />
      </Dialog>
    );
  }

  // <AlertDialog
  // showMsg={!this.props.message.ok}
  // onMessageAck = {this.onMessageAck}
  // msgTitle = {this.props.message.status}
  // msgContent = {this.props.message.content}
  // />
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
