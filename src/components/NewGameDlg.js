import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewGameDlg extends React.Component {
  state = {
    open: false,

    rows: 10,
    cols: 10,
    mines: 12
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onConfirm(this.state)
  };

  handleChange = name => event => {
    var value = event.target.value
    if (value > 1 && value <= 20)
        this.setState({ [name]: parseInt(value) });
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          Create new game
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new game</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide dimensions of new game
            </DialogContentText>
            <TextField
              id="standard-number"
              label="Rows"
              margin="normal"
              autoFocus
              value={this.state.rows}
              onChange={this.handleChange('rows')}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-number"
              label="Columns"
              margin="normal"
              value={this.state.cols}
              onChange={this.handleChange('cols')}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-number"
              label="Mines"
              margin="normal"
              value={this.state.mines}
              onChange={this.handleChange('mines')}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NewGameDlg.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default NewGameDlg;
