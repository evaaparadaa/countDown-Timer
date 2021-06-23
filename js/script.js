/* grab necessary elements */
const form = document.querySelector('.form');

const timeInput = document.querySelector('.time-input');

const format = document.querySelector("select[name='format']");

const setBtn = document.querySelector('.set-btn');

const countDown = document.querySelector('.countdown');

const stopBtn = document.querySelector('.stop-btn');

const resetBtn = document.querySelector('.reset-btn');


/* grab necessary elements ends */ 


/* global variables and constants*/
let countDownInterval;

let secondsLeftms;

let endTime;

let stopBtnClicked = false;
/* global variables ends */


/* .stop-btn click listener */

stopBtn.addEventListener('click', () =>{

    stopBtnClicked = !stopBtnClicked;

    if(stopBtnClicked == true){

        stopBtn.innerHTML = 'PlAY';

        resetBtn.disabled = false;

        clearInterval(countDownInterval);
    } else if (stopBtnClicked == false) {

        stopBtn.innerHTML = 'STOP';

        resetBtn.disabled = true;

        endTime = secondsLeftms + Date.now();

        countDownInterval = setInterval (() => {

            setCountDown(endTime);
        }, 1000);
    }
});

/* .stop-btn click listener ends */


/* .reset-btn click listener */
resetBtn.addEventListener('click', () => {
    resetCountDown();
});
/* .reset-btn click listener ends */


/* .form submit listener */
form.addEventListener('submit', (event)=>{
    event.preventDefault();

    let countDownTime = timeInput.value;

    if(countDownTime > 0) {

    if (format.value =='hours'){

        countDownTime = countDownTime * 3600000;

    } else if (format.value == 'minutes') {

        countDownTime = countDownTime * 60000;

    } else if(format.value == 'seconds'){

        countDownTime = countDownTime * 1000;
    }

    const now = Date.now();

    endTime = now + countDownTime;

    setCountDown(endTime);

    countDownInterval = setInterval(() => {
        setCountDown(endTime);
}, 1000);

setBtn.disabled = true;

stopBtn.disabled = false;
}

});
/* .form submit listener ends */


/* setCountDown function */

const setCountDown = (endtime) => {

    secondsLeftms = endTime - Date.now();

    const secondsLeft = Math.round(secondsLeftms / 1000);


    let hours = Math.floor(secondsLeft / 3600);
    let minutes = Math.floor(secondsLeft / 60) - (hours * 60);
    let seconds = secondsLeft % 60;

    if(hours < 10){
        hours = `0${hours}`;
    }
    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    if(seconds < 10) {

        seconds = `0${seconds}`;
    }

    if (secondsLeft <0) {
     resetCountDown();
        return;
    }

    countDown.innerHTML = `${hours} : ${minutes} : ${seconds}`;
};

/* setCountDown function ends */
const resetCountDown = () => {

    clearInterval(countDownInterval);

    countDown.innerHTML = '00 : 00 : 00';

    stopBtnClicked = false;

    stopBtn.innerHTML = 'STOP';

    setBtn.disabled = false;

    stopBtn.disabled = true;
    resetBtn.disabled = true;
};

/* resetCountDown function */

/* resetCountDown function ends */