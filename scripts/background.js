// set the alarms to trigger at 2pm and 8pm every day
chrome.runtime.onInstalled.addListener(() => {
    setDailyAlarms();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'refreshAt2PM' || alarm.name === 'refreshAt8PM') {
        console.log('Time to refresh news articles!');
        // you can trigger the refresh logic here, e.g., fetchAllArticles()
        // store refreshed articles using chrome.storage or directly fetch when needed
    }
});

// function to set up alarms for 2pm and 8pm
function setDailyAlarms() {
    // calculate time until 2pm
    let now = new Date();
    let twoPM = new Date();
    twoPM.setHours(14, 0, 0, 0); // set time to 2pm
    if (now > twoPM) {
        twoPM.setDate(twoPM.getDate() + 1); // move to the next day if 2pm has already passed
    }

    // calculate time until 8pm
    let eightPM = new Date();
    eightPM.setHours(20, 0, 0, 0); // set time to 8pm
    if (now > eightPM) {
        eightPM.setDate(eightPM.getDate() + 1); // move to the next day if 8pm has already passed
    }

    // set the alarms for both times
    chrome.alarms.create('refreshAt2PM', { when: twoPM.getTime(), periodInMinutes: 1440 });
    chrome.alarms.create('refreshAt8PM', { when: eightPM.getTime(), periodInMinutes: 1440 });
}
