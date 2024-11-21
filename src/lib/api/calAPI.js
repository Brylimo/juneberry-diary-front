import client from './client';

export const getTagsByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/getTagsByMonth', { 
        params: {
            year: year,
            month: month
        }, 
        withCredentials: false
    });
    return res.data;
}

export const getEventTagsByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/getEventTagsByMonth', { 
        params: {
            year: year,
            month: month
        }
    });
    return res.data;
}

export const getEmojisByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/getEmojisByMonth', { 
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

    const res = await client.post('/v1/cal/addEventTagList', { date: `${year}-${month}-${day}`, eventTagList: events });
    return res.data;
}

export const getTodosByDay = async (selectedYear, selectedMonth, selectedDay) => {
    const year = selectedYear;
    const month = ('0' + selectedMonth).slice(-2);
    const day = ('0' + selectedDay).slice(-2);

    const res = await client.get('/v1/cal/getTodosByDay', { 
        params: {
            date: `${year}-${month}-${day}`
        }
    });
    return res.data;
}

export const getTodayTxt = async (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.get('/v1/cal/getTodayTxt', { 
        params: {
            date: `${year}-${month}-${day}`
        }
    });
    return res.data;
}

export const addOneTodo = async ({ selectedDate, groupName, content, position, chkStatus }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/v1/cal/addOneTodo', { date: `${year}-${month}-${day}`, groupName, content, position, chkStatus });
    return res.data;
}

export const addDayEmoji = async ({ selectedDate, emojiCodeArray }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/v1/cal/addDayEmoji', { date: `${year}-${month}-${day}`, emojiCodeArray  });
    return res.data;
}

export const updateTodayTxt = async ({ selectedDate, todayTxt }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/v1/cal/updateTodayTxt', { date: `${year}-${month}-${day}`, todayTxt });    
    return res.data;
}

export const updateTodoChk = async ({ selectedDate, position, chkStatus }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/v1/cal/updateTodoChk', { date: `${year}-${month}-${day}`, position, chkStatus });    
    return res.data;
}

export const getAllDayTasks = ({ date }) =>
    client.get('/v1/cal/getAllDayTasks', { date });