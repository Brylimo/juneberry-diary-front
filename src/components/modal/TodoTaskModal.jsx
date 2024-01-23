import React, { useState } from 'react';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const TodoTaskModalBlock = styled.div`
    z-index: inherit;
`;

const TimePickerBlock = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 15px;
`;

const TodoTaskModal = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    return (
        <TodoTaskModalBlock>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePickerBlock>
                        <TimePicker 
                            label="Start Time"
                            value={startTime}
                            onChange={(newStartTime) => setStartTime(newStartTime)}
                            PopperProps={{style: {zIndex: 30000000000}}}
                        />
                        <TimePicker 
                            label="End Time"
                            value={endTime}
                            onChange={(newEndTime) => setEndTime(newEndTime)}
                        />
                    </TimePickerBlock>
                </DemoContainer>
            </LocalizationProvider>
        </TodoTaskModalBlock>
    )
}

export default TodoTaskModal;