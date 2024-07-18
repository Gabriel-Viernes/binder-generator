async function getLiturgicalDate(date) {
    let url = `http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`;
    let response = await fetch(url);
    response = await response.json();
    return response;
}

module.exports = getLiturgicalDate;
