import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NewGameDlg from './NewGameDlg';
import GameView from './GameView';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class MSAppBar extends React.Component {

   state = {
   }

  onConfirm = (sizes) => {
    const { rows, cols, mines } = sizes;

    this.props.client.createNewGame(rows, cols, mines)
        .then( game => this.setState({ game }) )
  }

  onCellClicked = (row, col, flag) => {
    if (flag === "Uncover")
        this.props.client.uncoverCell(this.state.game, row, col)
            .then( game => this.setState({ game }) )
    else
        this.props.client.flagCell(this.state.game, row, col, flag)
            .then( game => this.setState({ game }) )
  }

  render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Minesweeper by Charly 0.1
              </Typography>
              <NewGameDlg onConfirm={ this.onConfirm } />
            </Toolbar>
          </AppBar>
          <GameView game={ this.state.game } onCellClicked= { this.onCellClicked } />
        </div>
      );
  }
}

MSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MSAppBar);
