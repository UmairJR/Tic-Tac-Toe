import React from "react";

function Square({ chooseSquare, val }) {
  return (
    <div className="square" onClick={chooseSquare}>
      <img className={`piece ${val == "X" ? 'show' : val == "O" ? 'show' : ''}`} src={require(`../assets/images/${val == "X" ? 'x.svg' : val == "O" ? 'o.svg' : 'x.svg'}`)} alt="turns" />
    </div>
  );
}

export default Square;
