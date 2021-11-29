export const fullNameOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const nameOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

export const windDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

export const airQualities = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']

export const getNameOfDays = (day: number = 0): string => nameOfDays[day]

export const getFullNameOfDays = (day: number = 0): string => fullNameOfDays[day]

export const convertUnixTimeStampToTime = (timeStamp: number = 0, timeZone: string = ''): Date => {
  const convertedDate = new Date(timeStamp * 1000)
  return new Date(new Date(convertedDate.toLocaleString('en-US', { timeZone })))
}

export const currentDate = (timeZone: string = ''): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone }))
}

export const equalDate = (timeStamp: number = 0, timeStamp2: number = 0, timeZone: string, unixTime: boolean = true): boolean => {
  const date1 = convertUnixTimeStampToTime(timeStamp, timeZone)
  const date2 = convertUnixTimeStampToTime(timeStamp2, timeZone)
  return date1.getDate() === date2.getDate()
}

export const formatTime = (date: Date): string => {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  const minuteFormatted = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minuteFormatted + ' ' + ampm
  return strTime
}

export const convertDegToDirection = (windDeg: number): string => {
  const val = Math.floor((windDeg / 22.5) + 0.5)
  return windDirections[(val % 16)]
}

export const getAirQuality = (aqi: number) => airQualities[aqi - 1]
