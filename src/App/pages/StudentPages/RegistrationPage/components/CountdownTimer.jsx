import React, { memo, useEffect, useState } from "react";
import DateTimeDisplay from "./DateTimeDisplay ";
import useCountdown from "@/App/hooks/useCountdown";
import "./style/CountDownStyle.css";
const ExpiredNotice = () => {
	return (
		<div className="expired-notice">
			<span>Expired!!!</span>
			<p>Please select a future date and time.</p>
		</div>
	);
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
	return (
		<div className="show-counter">
			<div className="countdown-link gap-3">
				<div>Thời gian đăng ký còn lại</div>

				<DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
				<p>:</p>
				<DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
				<p>:</p>
				<DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
			</div>
		</div>
	);
};

const CountdownTimer = ({ targetDate }) => {
	const [days, hours, minutes, seconds, countdownControllers] = useCountdown(targetDate);
	useEffect(() => {
		countdownControllers.startCountdown();
	}, [countdownControllers]);
	if (days + hours + minutes + seconds <= 0) {
		return <ExpiredNotice />;
	} else {
		return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
	}
};

export default memo(CountdownTimer);
