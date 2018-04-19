import React from "react";
import Tile from "./Tile.js";

import style from '../styles/Board.css';

import sudoku from "sudoku-umd";

const Board = props => {
	const splitedTiles = props.board.split("");


	return (
		<form  className={style.Board + " " + (props.hideBoard_GameButtons ? style.hide : "")}>
			{splitedTiles.map((item, index) => (
				<Tile className={style.Tile + " " + (props.checkedAnswers[index] == false ? style.differentBackground : "")}
					key={index} 
					onChange={event => props.onChange(event, index)} 
					value={item}
					readOnly={props.initialBoard[index] == '.' ? false : true}
				/>
			))}
		</form>
	);
};

export default Board;