import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
import Covered from '../cells/Covered.png';
import RedFlagged from '../cells/RedFlagged.png'
import Mine from '../cells/Mine.png'
import ExplodedMine from '../cells/ExplodedMine.png'
import Uncovered0 from '../cells/Uncovered(0).png'
import Uncovered1 from '../cells/Uncovered(1).png'
import Uncovered2 from '../cells/Uncovered(2).png'
import Uncovered3 from '../cells/Uncovered(3).png'
import Uncovered4 from '../cells/Uncovered(4).png'
import Uncovered5 from '../cells/Uncovered(5).png'
import Uncovered6 from '../cells/Uncovered(6).png'
import Uncovered7 from '../cells/Uncovered(7).png'
import Uncovered8 from '../cells/Uncovered(8).png'
import MoveAdvice from './MoveAdvice'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

  image: {
    width: 20,
    height: 20,
  },
  table: {
    marginTop: 50,
    borderCollapse: 'collapse',
    border: '5px solid #CCC',
  },
  cell: {
     border: 'none',
     margin: 0,
     padding: 0,
  }
});

const images = {
    "Covered": Covered,
    "RedFlagged": RedFlagged,
    "Mine": Mine,
    "ExplodedMine": ExplodedMine,
    "Uncovered(0)": Uncovered0,
    "Uncovered(1)": Uncovered1,
    "Uncovered(2)": Uncovered2,
    "Uncovered(3)": Uncovered3,
    "Uncovered(4)": Uncovered4,
    "Uncovered(5)": Uncovered5,
    "Uncovered(6)": Uncovered6,
    "Uncovered(7)": Uncovered7,
    "Uncovered(8)": Uncovered8
}

class CellGrid extends React.Component {

    state = {
        open: false
    }

  handleClick = (e, row, col) => {
    var action
    if (e.ctrlKey) action = "QuestionMarked"
    else if (e.shiftKey) action = "RedFlagged"
    else action = "Uncover";

    this.setState( {row: row, col: col, open: true})
    this.props.onCellClicked( row, col, action )
  }

  handleClose = () => {
    this.setState( { open: false } )
  }

  render() {
        if (!this.props.game) {
            return (
                <div>Please, create a new game</div>
            );
        }

      const { classes, game: {cells} } = this.props;
      const { open, row, col } = this.state
      return (

        <div className={classes.root}>
            <table className={classes.table}>
                <tbody>
                    {cells.flatMap((cols, row) => (
                        <tr className={classes.cell} key={ row }>
                        {cols.map((cell, col) => (
                            <td
                                className={classes.cell} key={ `${row}:${col}` }
                                onClick= { e => this.handleClick(e, row + 1, col + 1) }
                            ><img className={classes.image} src={ images[cell] } alt="?" /></td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <MoveAdvice onClose={ this.handleClose } row={ row } col={ col } open = { open }/>
        </div>
      );
    }
}

export default withStyles(styles)(CellGrid);
