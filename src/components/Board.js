import React, {useState} from 'react'
import Cell from "./Cell";

const Board = ({ncols, nrows, chanceLightStartOn}) => {
    const createBoard = () => {
        console.log('CHECK');
        let board = [];

        for (let y = 0; y < nrows; y++) {
            let row = [];
            for (let x = 0; x < ncols; x++) {
                row.push(Math.random() < chanceLightStartOn)
            }
            board.push(row);
        }

        return board;
    };

    const [board, setBoard] = useState(createBoard());
    console.log(board);
    const [hasWon, setWon] = useState(false);

    const flipCellsAround = (coord) => {
        console.log('FLIPPING', coord);
        let newBoard = board;
        let [y, x] = coord.split("-").map(Number);

        console.log(y, x);

        function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                newBoard[y][x] = !newBoard[y][x];
            }
        }

        flipCell(y, x); //Flip initial cell
        flipCell(y, x - 1); //flip left
        flipCell(y, x + 1); //flip right
        flipCell(y - 1, x); //flip below
        flipCell(y + 1, x); //flip above
        setBoard([...newBoard]);
        setWon(newBoard.every(row => row.every(cell => !cell)));
    };

    const makeTable = () => {
        let tblBoard = [];
        for (let y = 0; y < nrows; y++) {
            let row = [];
            for (let x = 0; x < ncols; x++) {
                let coord = `${y}-${x}`;
                row.push(
                    <Cell
                        key={coord}
                        isLit={board[y][x]}
                        flipCellsAroundMe={() => flipCellsAround(coord)}
                    />
                );
            }
            tblBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <table className='Board'>
                <tbody>{tblBoard}</tbody>
            </table>
        );
    };

    return (
        <div>
            {
                hasWon ? (
                    <div className='winner'>
                        <span className='neon-orange'>YOU</span>
                        <span className='neon-blue'>WIN!</span>
                    </div>
                ) : (
                    <div>
                        <div className='Board-title'>
                            <div className='neon-orange'>Lights</div>
                            <div className='neon-blue'>Out</div>
                        </div>
                        {makeTable()}
                    </div>
                )
            }
        </div>
    )
};

export default Board;

Board.defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartOn: 0.25
};
