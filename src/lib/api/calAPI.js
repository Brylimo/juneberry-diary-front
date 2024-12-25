import client from './client';

export const getTagsByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/tags', { 
        params: {
            year: year,
            month: month
        }, 
        withCredentials: false
    });
    return res.data;
}

export const getEventTagsByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/event-tags', { 
        params: {
            year: year,
            month: month
        }
    });
    return res.data;
}

export const getEmojisByMonth = async (year, month) => {
    const res = await client.get('/v1/cal/emojis', { 
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

    const res = await client.post('/v1/cal/event-tags', { date: `${year}-${month}-${day}`, eventTagList: events });
    return res.data;
}

export const getTodosByDay = async (selectedYear, selectedMonth, selectedDay) => {
    const year = selectedYear;
    const month = ('0' + selectedMonth).slice(-2);
    const day = ('0' + selectedDay).slice(-2);

    const res = await client.get('/v1/cal/todos', { 
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

    const res = await client.get('/v1/cal/today-text', { 
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

    const res = await client.post('/v1/cal/todo', { date: `${year}-${month}-${day}`, groupName, content, position, chkStatus });
    return res.data;
}

export const addDayEmoji = async ({ selectedDate, emojiCodeArray }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.post('/v1/cal/emoji', { date: `${year}-${month}-${day}`, emojiCodeArray  });
    return res.data;
}

export const updateTodayTxt = async ({ selectedDate, todayTxt }) => {
    const year = selectedDate.getFullYear();
    const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + selectedDate.getDate()).slice(-2);

    const res = await client.put('/v1/cal/today-text', { date: `${year}-${month}-${day}`, todayTxt });    
    return res.data;
}

export const updateTodo = async ({ id, chkStatus }) => {
    const res = await client.patch(`/v1/cal/todo/${id}`, { chkStatus });
    return res.data;
}