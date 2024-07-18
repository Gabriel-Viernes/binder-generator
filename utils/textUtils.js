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
