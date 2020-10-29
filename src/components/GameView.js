import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GameBoard from './GameBoard'
import { withStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

class GameView extends React.Component {

  render() {
    var { game, classes } = this.props;

    if (!game) {
        return (
            <div>Please, create a new game</div>
        );
    }

      return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="column">
              <Grid container item direction="row" xs={12}>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom variant="subtitle1">
                          Mines to find: { 'X' }
                        </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom variant="subtitle1">
                          { game.state }
                        </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Typography gutterBottom variant="subtitle1">
                          Time: { 'X' }
                        </Typography>
                      </Paper>
                  </Grid>
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="body2" color="textSecondary">
                  Click: Uncover, Shift-Click: Flag / Question mark / Unflag
                </Typography>
              </Grid>
              <Grid item xs={12} sm>
                  <Paper className={classes.paper}>
                       <GameBoard game={ this.props.game } onCellClicked= { this.props.onCellClicked } />
                  </Paper>
              </Grid>
            </Grid>
        </div>
      );
    }
}

export default withStyles(styles)(GameView);
