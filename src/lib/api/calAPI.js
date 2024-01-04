import client from './client';

export const getAllDayTasks = ({ date }) =>
    client.get('/cal/getAllDayTasks', { date });