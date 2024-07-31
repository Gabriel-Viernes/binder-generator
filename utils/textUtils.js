function convertToOrdinal(input) {
    input = input.toString();
    let condition = input.substring(input.length-1);
    switch(condition) {
        case "1":
            return `${input}st`;
        case "2": 
            return `${input}nd`;
        case "3": 
            return `${input}rd`;
        default:
            return `${input}th`;
    }
}

function capitalize(input) {
    let firstLetter = input.slice(0,1).toUpperCase();
    return firstLetter + input.substring(1);
}

function parseDayAndTime(input) {
    //correct format is day name abbreviation + military time
    //ex: sat1600, sat0900
    let parsed = "";
    let day = input.slice(0,3)

    switch(day) {
        case "sun":
            parsed += "Sunday "
            break;
        case "mon":
            parsed += "Monday ";
            break;
        case "tue": 
            parsed += "Tuesday ";
            break;
        case "wed":
            parsed += "Wednesday ";
            break;
        case "thu":
            parsed += "Thursday ";
            break;
        case "fri":
            parsed += "Friday";
            break;
        case "sat":
            parsed += "Saturday ";
            break;
    }

    let ampm = "";
    
    if(parseInt(input.slice(3,5)) > 12) {
        ampm = "P.M.";
        parsed += `${parseInt(input.slice(3,5)) - 12}:`
        parsed += `${input.slice(5,7)} ${ampm}`;
    } else {
        ampm = "A.M.";
        parsed += `${input.slice(3,5)}:`;
        parsed += `${input.slice(5,7)} ${ampm}`;
    }
    console.log(parsed);
    return parsed
}

parseDayAndTime("sat1600")

function convertMonthToWords(input) {
    switch(input) {
        case 1:
            return "January";
        case 2: 
            return "Febuary";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

module.exports.convertToOrdinal = convertToOrdinal;
module.exports.capitalize = capitalize;
module.exports.convertMonthToWords = convertMonthToWords;
module.exports.parseDayAndTime = parseDayAndTime;
