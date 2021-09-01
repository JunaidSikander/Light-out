import React from 'react'

const Cell = ({flipCellsAroundMe, isLit}) => {

    const handleClick = (evt) => {
        flipCellsAroundMe();
    };

    let classes = "Cell " + (isLit ? " Cell-lit" : "");

    return (
        <td className={classes}  onClick={handleClick}/>
    )
};

export default Cell;
