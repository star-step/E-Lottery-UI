import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

export default function Timer({ endtime, color }) {
  const [day, setdays] = useState(0);
  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);
  const [left_cartoon, setLeft_cartoon] = useState({});

  const toTimestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt;
  };

  const calcTImeLeft = () => {
    if(endtime !== "00"){
      setInterval(function () {
        var date_future = toTimestamp(endtime);
        var date_now = new Date();
        var seconds = Math.floor((date_future - date_now) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
  
        hours = hours - days * 24;
        minutes = minutes - days * 24 * 60 - hours * 60;
        seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
        setdays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }, 1000);
    }
  };

  useEffect(() => {
    calcTImeLeft();
  }, []);

  return (
    <>
      <div className="row mt-2 mx-1 bg">
        <div className="progress-bar col-3">
          <CircularProgressbar
            maxValue={30} 
            value={day}
            text={`${day}`} 
            strokeWidth={10}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "50px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `${color}`,
              textColor: "#fff",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          Days
        </div>
        <div className="progress-bar col-3">
          <CircularProgressbar
            maxValue={24}
            value={hour}
            text={`${hour}`} 
            strokeWidth={10}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "50px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `${color}`,
              textColor: "#fff",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          Hours
        </div>
        <div className="progress-bar col-3">
          <CircularProgressbar
            maxValue={60}
            value={minute}
            text={`${minute}`} 
            strokeWidth={10}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "50px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `${color}`,
              textColor: "#fff",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          Min
        </div>
        <div className="progress-bar col-3">
          <CircularProgressbar
            maxValue={60}
            value={second}
            text={`${second}`} 
            strokeWidth={10}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              // rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "50px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              // pathColor: `rgba(62, 152, 199)`,
              pathColor: `${color}`,
              textColor: "#fff",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7"
            })}
          />
          Sec
        </div>
      </div>
    </>
    // <>
    // <div className="circleProgress_wrapper circleProgress_wrapper_day">
    //   <div className="wrapper right">
    //     <div className="circleProgress rightcircle right_cartoon"></div>
    //   </div>
    //   <div className="wrapper left">
    //     <div className="circleProgress leftcircle left_cartoon"></div>
    //   </div>
    //   <span id="timer">{day}</span>
    // </div>
    // <div className="circleProgress_wrapper circleProgress_wrapper_hour">
    //   <div className="wrapper right">
    //     <div className="circleProgress rightcircle right_cartoon"></div>
    //   </div>
    //   <div className="wrapper left">
    //     <div className="circleProgress leftcircle left_cartoon"></div>
    //   </div>
    //   <span id="timer">{hour}</span>
    // </div>
    // <div className="circleProgress_wrapper circleProgress_wrapper_min">
    //   <div className="wrapper right">
    //     <div className="circleProgress rightcircle right_cartoon"></div>
    //   </div>
    //   <div className="wrapper left">
    //     <div className="circleProgress leftcircle left_cartoon"></div>
    //   </div>
    //   <span id="timer">{minute}</span>
    // </div>
    // <div className="circleProgress_wrapper circleProgress_wrapper_sec">
    //   <div className="wrapper right">
    //     <div className="circleProgress rightcircle right_cartoon"></div>
    //   </div>
    //   <div className="wrapper left">
    //     <div className="circleProgress leftcircle left_cartoon"></div>
    //   </div>
    //   <span id="timer">{second}</span>
    // </div>
    // </>
  );
}
