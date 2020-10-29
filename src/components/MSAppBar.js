import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NewGameDlg from './NewGameDlg';
import GameView from './GameView';
import MoveAdvice from './MoveAdvice'

//import { sizing } from '@material-ui/system';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
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


class MSAppBar extends React.Component {

    state = {
        open: false
    }

  onConfirm = (sizes) => {
    const { rows, cols, mines } = sizes;

    this.props.client.createNewGame(rows, cols, mines)
        .then( game => this.setState({ game }) )
  }


  handleClose = () => {
    this.setState( { open: false } )
  }


  onCellClicked = (row, col, flag) => {
    const { game } = this.state;

    if (game.state !== "Playing") {
        this.setState({open: true, msg: `Ended game, create new game to play.`})
        return
    }

    this.setState({open: true, msg: `Clicked on ${row} @ ${col}`})

    if (flag === "Uncover")
        this.props.client.uncoverCell(game, row, col)
            .then( game => this.setState({ game }) )
    else
        this.props.client.flagCell(game, row, col, flag)
            .then( game => this.setState({ game }) )
  }

  render() {
      const { classes } = this.props;
      const { msg, open } = this.state;

      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Minesweeper by Charly 0.2
              </Typography>
              <NewGameDlg onConfirm={ this.onConfirm } />
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
              <GameView game={ this.state.game } onCellClicked= { this.onCellClicked } />
          </Paper>
          <MoveAdvice onClose={ this.handleClose } msg={ msg } open = { open }/>
        </div>
      );
  }
}

MSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MSAppBar);
