import React from "react";

import style from "../styles/DifficultyButtons.css";

const DifficultyButtons = props => (
	<div className={style.DifficultyButtons + " " + (props.hideDifficultyButtons ? style.hide : "")}>
		<button onClick={props.setDifficultyEasy}>EASY</button>
		<button onClick={props.setDifficultyMedium}>MEDIUM</button>
		<button onClick={props.setDifficultyHard}>HARD</button>
	</div>
);

export default DifficultyButtons;
