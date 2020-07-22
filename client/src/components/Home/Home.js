import React, { useState, useEffect } from "react";
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
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";
import UserListModal from "./UserListModal";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getUserToken } from '../../actions/userAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    backgroundColor: "#e0e0e0",
    marginTop: "50px",
    minHeight: "630px",
  },
  inline: {
    display: "inline",
  },
  textBox: {
    height: "570px",
    display: "flex",
    flexDirection: "column",
  },
  sendButton: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addMsgIcon: {
    position: "relative",
    float: "right",
    cursor: "pointer",
    zIndex: 100,
  },
  welcomeBanner: {
    height: "570px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSidePanel: {
    backgroundColor: "#eeeeee",
  },
}));
const Home = () => {
  const classes = useStyles();
  const [openUserListModal, setOpenUserListModal] = useState(false);
  const userSelector = useSelector((state) => state.user);
  const authToken = getUserToken();
  const dispatch = useDispatch();
  useEffect(() => {
    if (authToken) {
      dispatch(getAllUsers())
    }   
  }, [authToken])

  const toggleUserListModal = (value) => {
    setOpenUserListModal(value);
  };
  return (
    <div className={classes.root}>
      <Container className={classes.mainContainer}>
        <Typography variant="h6" component="h2">
          Chats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div
              className={classes.addMsgIcon}
              onClick={() => toggleUserListModal(true)}
            >
              <AddCommentOutlinedIcon />
            </div>
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
          <Grid item xs={12} sm={8} className={classes.rightSidePanel}>
            {userSelector.selectedUser ? (
              <div className={classes.textBox}>
                <ChatNavBar name={userSelector.selectedUser} />
                <div class="d-flex flex-column" id="messages"></div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={11}>
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
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <div className={classes.sendButton}>
                      <SendIcon />
                    </div>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div className={classes.welcomeBanner}>
                <p style={{ textAlign: "center", fontSize: "16px" }}>
                  welcome to E-chat messaging App
                  <br />
                  start conversation with your favorite people
                </p>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <UserListModal
        openUserListModal={openUserListModal}
        toggleUserListModal={toggleUserListModal}
      />
    </div>
  );
};

export default Home;
