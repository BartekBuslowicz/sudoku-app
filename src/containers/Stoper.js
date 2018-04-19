import React from "react";
import style from "../styles/Stoper.css";

class Stoper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
	}

	getFormattedTimes() {
		let { minutes, seconds, miliseconds } = this.state.times;
		return `${minutes}:${seconds}:${Math.floor(miliseconds)}`;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.stoperRunning) {
			console.log("stoper recieved: " + nextProps.stoperRunning);
			this.start();
		}

		if(!nextProps.stoperRunning) {
			console.log('stoper recieved: ' + nextProps.stoperRunning)
			this.stopAndReset();
		}
	}

	start() {
		if (!this.state.running && this.props.stoperRunning) {
			this.setState({
				running: true,
				watch: setInterval(() => this.step(), 10)
			});
			console.log("started stoper");
		}
	}

	stopAndReset() {
		this.setState({
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate() {
		let { minutes, seconds, miliseconds } = this.state.times;
		miliseconds += 1;
		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}

		this.setState({
			times: {
				minutes,
				seconds,
				miliseconds
			}
		});
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = "0" + result;
		}
		return result;
	}

	render() {
		return (
			<div
				className={
					style.Stoper +
					" " +
					(this.props.hideBoard_GameButtons ? style.hide : "")
				}
			>
				{this.getFormattedTimes()}
			</div>
		);
	}
}

export default Stoper;
