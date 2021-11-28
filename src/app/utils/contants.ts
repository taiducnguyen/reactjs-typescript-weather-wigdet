export const fullNameOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const nameOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export const getNameOfDays = (day: number) => nameOfDays[day];

export const convertUnixTimeStampToTime = (timeStamp: number) => new Date(timeStamp * 1000);

export const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minuteFormatted = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minuteFormatted + ' ' + ampm;
    return strTime;
}

export const windDirections = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];