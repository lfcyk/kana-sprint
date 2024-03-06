function msToTime(s) {
    let hours = Math.floor(s / (1000 * 60 * 60));
    let minutes = Math.floor(s / (1000 * 60) % 60);
    let seconds = Math.floor(s / 1000 % 60);
    let milliseconds = Math.floor(s % 1000);
    
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(3, '0');
  
    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}
  
export {msToTime};