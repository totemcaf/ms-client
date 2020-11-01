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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//import { sizing } from '@material-ui/system';

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


class MSAppBar extends React.Component {

    state = {
        open: false,
        games: []
    }

  componentDidMount() {
    this.props.client.listGames()
        .then( games => {
                if (games.error)
                    this.setState({open: true, msg: "Error: " + games.error})
                else
                    this.setState( { games, game: games && games[0] } )
    })
  }

  onConfirm = (sizes) => {
    const { rows, cols, mines } = sizes;

    this.props.client.createNewGame(rows, cols, mines)
        .then( game => {
                if (game.error)
                    this.setState({open: true, msg: "Error: " + game.error})
                else
                    this.setState( prevState => ({ game, games: prevState.games.concat([game]) }) )
            })
  }

  handleClose = () => {
    this.setState( { open: false } )
  }

  handleGameSelection = event => {
    this.props.client.findGame(event.target.value)
        .then( game => {
                if (game.error)
                    this.setState({open: true, msg: "Error: " + game.error})
                else
                    this.setState( { game } )
    })
  }

  onCellClicked = (row, col, flag) => {
    const { game } = this.state;

    if (game.state !== "Playing") {
        this.setState({open: true, msg: `Ended game, create new game to play.`})
        return
    }

    this.setState({open: true, msg: `Clicked on ${row} @ ${col}`})

    const action = flag === "Uncover"
        ? this.props.client.uncoverCell(game, row, col)
        : this.props.client.flagCell(game, row, col, flag)

    action.then( game => {
                if (game.error)
                    this.setState({open: true, msg: "Error: " + game.error})
                else
                    this.setState({ game })
            })
  }

  render() {
      const { classes } = this.props;
      const { msg, open, game, games } = this.state;

      console.log(`MSAppBar: game: ${ game && game.id } `)
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Minesweeper by Charly 0.4
              </Typography>
              <Typography variant="subtitle1" color="inherit">
                Game:
                  <FormControl className={classes.formControl}>
                    <Select
                        className={classes.select}
                        disabled={ !game }
                        onChange={ this.handleGameSelection }
                        value={ (game || {}).id}
                        native
                    >
                        {games.map( g =>
                            <option value={g.id}>{ g.id }</option>
                        )}
                    </Select>
                  </FormControl>
              </Typography>

              <NewGameDlg onConfirm={ this.onConfirm } />
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
              <GameView game={ game } onCellClicked= { this.onCellClicked } />
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
