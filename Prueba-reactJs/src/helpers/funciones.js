function milisecondsToHours(ms, variable) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(seconds / 3600);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let result = `${hours}:${minutes}:${seconds}`;
    return variable(result)
}

export {milisecondsToHours}
