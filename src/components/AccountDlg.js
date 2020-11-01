import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Message from './Message';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  select: {
    border: "1px black",
    backgroundColor: "white",
    marginLeft: 5,
    marginRight: 5,
  },
  paper: {
    padding: 2,
    margin: 'auto',
    maxWidth: 500,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AccountDlg extends React.Component {
  state = {
    error: {
        msg: null,
        open: false
    },

    open: false,
  };

  handleErrorClose = () => {
    this.setState( { error: { msg: false } } )
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onConfirm(this.state)
  };

  render() {
    const { classes, onAccountChange, onSelectedGameChanged, currentGameId, games, accountId } = this.props;
    console.log(`Rendenring AccountDlg with ${accountId} - ${currentGameId}`)
    const { error } = this.state

    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          User games
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Game and account selection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Change current account
            </DialogContentText>
            <TextField
              id="standard-number"
              label="Account id"
              margin="normal"
              autoFocus
              value={accountId}
              onChange={ event => onAccountChange(event.target.value) }
              type="string"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogContentText>
              Choose game to play
            </DialogContentText>
            <Select
                label="Game"
                className={classes.select}
                disabled={ !games.length }
                onChange={ e => onSelectedGameChanged(e.target.value) }
                value={ (currentGameId || {}).id}
                native
            >
                {games.map( g =>
                    <option value={g.id} key={g.id} >{ g.id }</option>
                )}
            </Select>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Message onClose={ this.handleErrorClose } msg={ error.msg } open = { error.open }/>
      </div>
    );
  }
}

AccountDlg.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountDlg);
