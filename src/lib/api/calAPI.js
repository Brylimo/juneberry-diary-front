import client from './client';

export const getTagsByMonth = ({ year, month }) =>
    client.get('/cal/getTagsByMonth', { params: {
        year: year,
        month: month
    }});

export const getAllDayTasks = ({ date }) =>
    client.get('/cal/getAllDayTasks', { date });