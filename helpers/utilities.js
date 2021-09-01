
/**
 * This method gets a format of hours. EX. HH:MM:SS (difference)
 * @param {*} seconds 
 * @returns 
 */
const getHourFormatDiff = (startDateTime = new Date(), endDateTime = new Date()) => {
    let msStartDate = startDateTime.getTime();
    let msEndDate = endDateTime.getTime();
    let diffMs = msEndDate  - msStartDate;
    let seconds = diffMs / 1000;
    let dateISO = new Date(seconds * 1000).toISOString().substr(11, 8);
    
    return dateISO;
}

module.exports = {
    getHourFormatDiff,
}