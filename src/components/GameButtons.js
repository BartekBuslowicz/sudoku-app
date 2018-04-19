import React from "react";

import style from "../styles/GameButtons.css";

const GameButtons = props => (
	<div
		className={style.GameButtons + " " + (props.hideBoard_GameButtons ? style.hide : "")}
	>
		<button onClick={props.checkSudoku}>Check</button>
		<button onClick={props.newGame}>New Game</button>
		<button onClick={props.solveSudoku}>Solve</button>
		<button onClick={props.resetBoard}>Restart</button>
	</div>
);

export default GameButtons;
