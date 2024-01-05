import client from './client';

export const getTags = ({ year, month }) =>
    client.get('/cal/getTagDaysByMonth');

export const getAllDayTasks = ({ date }) =>
    client.get('/cal/getAllDayTasks', { date });