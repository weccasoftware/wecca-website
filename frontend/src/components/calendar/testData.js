const { addHours, subDays, addDays } = require("date-fns");

const startDate = subDays(new Date(), 10)
const endDate = addDays(new Date(), 10)

const createRandomDates = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return [date, addHours(date, 1)]
}

const dates = []
for(let i = 0; i < 10 * 2; i++){
    dates.push(...createRandomDates(startDate, endDate))
}

let i = 0;
module.exports = {
    sampleEvents: [
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Software',
            title: "Software Test",
            description: 'This is a test event in order to see if the calendar works and looks good',
            creator: 'Ethan Bodnar'
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Materials',
            title: "Materials Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Mould',
            title: "Mould Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Graphic Design',
            title: "Graphic Design Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Design and Analysis',
            title: "Design and Analysis Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Training',
            title: "Training Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Technical Communications',
            title: "Technical Communications Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'General',
            title: "General Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Executive',
            title: "Executive Test",
        },
        {
            startTime: dates[i++],
            endTime: dates[i++],
            team: 'Captain',
            title: "Captain Test",
            creator: "Anthony De Rango"
        }
    ]
}