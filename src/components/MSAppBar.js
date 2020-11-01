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
import AccountDlg from './AccountDlg';
import GameView from './GameView';
import Message from './Message'

//import { sizing } from '@material-ui/system';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  account: {
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
        games: [],
        accountId: "guess",
    }

  componentDidMount() {
    this.loadCurrentAccountGames()
  }

  loadCurrentAccountGames = () => {
    this.props.client.listGames(this.state.accountId)
        .then( games => {
                if (games.error)
                    this.setState({open: true, msg: "Error: " + games.error})
                else
                    this.setState( { games, game: games && games[0] } )
    })
  }

  handleChangeAccountId = accountId => {
      this.setState({ accountId: accountId, games: [], game: null }, () => {
          if (this.state.timer)
            clearTimeout(this.state.timer);
          const timer = setTimeout(() => this.loadCurrentAccountGames(), 500);
          this.setState( {timer})
      } )
  }

  onConfirm = (sizes) => {
    const { rows, cols, mines } = sizes;

    this.props.client.createNewGame(this.state.accountId, rows, cols, mines)
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

  handleGameSelection = gameId => {
    console.log("Selected " + gameId);
    this.props.client.findGame(this.state.accountId, gameId)
        .then( game => {
                if (game.error)
                    this.setState({open: true, msg: "Error: " + game.error})
                else
                    this.setState( { game } )
    })
  }

  onConfirmAccount = (accountId, gameId) => {
  }

  onCellClicked = (row, col, flag) => {
    const { accountId, game } = this.state;

    if (game.state !== "Playing") {
        this.setState({open: true, msg: `Ended game, create new game to play.`})
        return
    }

    this.setState({open: true, msg: `Clicked on ${row} @ ${col}`})

    const action = flag === "Uncover"
        ? this.props.client.uncoverCell(accountId, game, row, col)
        : this.props.client.flagCell(accountId, game, row, col, flag)

    action.then( game => {
                if (game.error)
                    this.setState({open: true, msg: "Error: " + game.error})
                else
                    this.setState({ game })
            })
  }

  render() {
      const { classes, client } = this.props;
      const { msg, open, game, games, accountId } = this.state;

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
              <div className={classes.account}>
                  <Typography variant="substitle1" color="inherit">
                    User: { accountId }
                  </Typography>
              </div>
              <AccountDlg
                onConfirm={ this.onConfirmAccount }
                client={ client }
                accountId={ accountId }
                currentGameId={ game && game.id }
                games={ games }
                onAccountChange={this.handleChangeAccountId}
                onSelectedGameChanged={this.handleGameSelection}
              />
              <NewGameDlg onConfirm={ this.onConfirm } />
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
              <GameView game={ game } onCellClicked= { this.onCellClicked } />
          </Paper>
          <Message onClose={ this.handleClose } msg={ msg } open = { open } />
        </div>
      );
  }
}

MSAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MSAppBar);
