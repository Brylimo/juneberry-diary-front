import client from './client';

export const getTagsByMonth = async (year, month) => {
    const res = await client.get('/cal/getTagsByMonth', { 
        params: {
            year: year,
            month: month
        }, 
        withCredentials: false
    });
    return res.data;
}

export const getEventTagsByMonth = async (year, month) => {
    const res = await client.get('/cal/getEventTagsByMonth', { 
        params: {
            year: year,
            month: month
        }
    });
    return res.data;
}

export const addEventTagList = async ({ selectedDate, events }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/cal/addEventTagList', { date: `${year}-${month}-${day}`, eventTagList: events });
    return res.data;
}

export const getAllDayTasks = ({ date }) =>
    client.get('/cal/getAllDayTasks', { date });