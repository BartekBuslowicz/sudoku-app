import React from "react";

import sudoku from "sudoku-umd";

import style from "../styles/App.css";

import Board from "../components/Board.js";

import Stoper from "./Stoper.js";

import GameButtons from "../components/GameButtons.js";

import DifficultyButtons from "../components/DifficultyButtons.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialBoard: "",
			board: "",
			hideBoard_GameButtons: true,
			hideDifficultyButtons: false,
			checkedAnswers: "",
			stoperRunning: true
		};
	}

	setDifficulty(difficultyLevel) {
		const board = sudoku.generate(difficultyLevel);
		this.setState({
			initialBoard: board,
			board,
			hideBoard_GameButtons: false,
			hideDifficultyButtons: true,
			stoperRunning: true
		});
		console.log(difficultyLevel);
		console.log("stoper in app: " + this.state.stoperRunning)
	}

	handleChange(event, position) {
		const value = event.target.value;
		let number = ".";
		if (value) {
			if (value.length > 1) {
				number = value[value.length - 1];
			} else {
				number = value[0];
			}
		}
		const board =
			this.state.board.substr(0, position) +
			number +
			this.state.board.substr(
				position + 1,
				this.state.board.length - position
			);

		this.setState({ board });
	
	}

	resetBoard() {
		this.setState({
			board: this.state.initialBoard
		});
		console.log("reset board");
	}

	solveSudoku() {
		this.setState({
			board: sudoku.solve(this.state.initialBoard),
			stoperRunning: false
		});
		console.log("solved");
	}

	newGame() {
		this.setState({
			board: "",
			hideBoard_GameButtons: true,
			hideDifficultyButtons: false,
			stoperRunning: false
		});
		console.log("new game");
	}

	checkSudoku() {
		const answers = this.state.board.split("");
		const correctAnswers = sudoku.solve(this.state.initialBoard).split("");

		const checkedAnswers = answers.map(
			(item, index) => item == correctAnswers[index]
		);
		this.setState({ checkedAnswers: checkedAnswers });
		console.log(answers === correctAnswers ? "success" : "wrong input");

		for (let i = 0; i < answers.length; i++) {
			if(answers[i] === correctAnswers[i]) {
				console.log('everything is ok')
			} else {
				console.log('some values are not ok')
			}
		}
		
		setTimeout(() => {
			this.setState({ checkedAnswers: "" });
		}, 3000);
	}

	render() {
		return (
			<div className={style.App}>
				<h1>Sudoku</h1>

				<DifficultyButtons
					hideDifficultyButtons={this.state.hideDifficultyButtons}
					setDifficultyEasy={() => this.setDifficulty("easy")}
					setDifficultyMedium={() => this.setDifficulty("medium")}
					setDifficultyHard={() => this.setDifficulty("hard")}
				/>

				<Board
					hideBoard_GameButtons={this.state.hideBoard_GameButtons}
					board={this.state.board}
					initialBoard={this.state.initialBoard}
					onChange={this.handleChange.bind(this)}
					checkedAnswers={this.state.checkedAnswers}
				/>
				<Stoper
					hideBoard_GameButtons={this.state.hideBoard_GameButtons}
					stoperRunning={this.state.stoperRunning}
				/>

				<GameButtons
					hideBoard_GameButtons={this.state.hideBoard_GameButtons}
					resetBoard={this.resetBoard.bind(this)}
					solveSudoku={this.solveSudoku.bind(this)}
					newGame={this.newGame.bind(this)}
					checkSudoku={this.checkSudoku.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
