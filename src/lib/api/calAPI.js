import client from './client';

export const getTagsByMonth = async (year, month) => {
    const res = await client.get('/cal/getTagsByMonth', { params: {
        year: year,
        month: month
    }});
    return res.data;   
}

export const getAllDayTasks = ({ date }) =>
    client.get('/cal/getAllDayTasks', { date });