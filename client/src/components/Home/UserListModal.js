import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { setUserToRightPanel } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));


export default function DialogSelect(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [selectedUserId, setSelectedUserId] = React.useState('');

  const handleChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const handleOk = () => {
    dispatch(setUserToRightPanel(selectedUserId));
    props.toggleUserListModal(false);
  }

  const handleClose = () => {
    props.toggleUserListModal(false);
  };

  const options = () => {
    if (userDetails.userList && userDetails.userList.length > 0) {
      return userDetails.userList.map((a) => (
        <MenuItem key={a.id} value={a.id}>
          <AccountCircleOutlinedIcon />
          {a.firstName}
        </MenuItem>
      ));
    }
  };
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.openUserListModal} onClose={handleClose}>
        <DialogTitle>New Chat</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Select user</InputLabel>
              <Select
                fullWidth
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedUserId}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {options()}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}