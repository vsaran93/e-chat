import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ChatNavBar from "../../partials/ChatNavBar";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    backgroundColor: "#e0e0e0",
    marginTop: "50px",
  },
  inline: {
    display: "inline",
  },
  textBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}));
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
          <Grid item xs={12} sm={8}>
            <div className={classes.textBox}>
              <ChatNavBar />
              {/* <!-- Messages --> */}
              <div class="d-flex flex-column" id="messages"></div>
              {/* <!-- Input --> */}
              <div>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={""}
                    onChange={""}
                    labelWidth={60}
                  />
                   <SendIcon />
                </FormControl>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
