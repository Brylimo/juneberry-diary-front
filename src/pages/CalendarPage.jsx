import React from "react";
import CalendarForm from "../containers/cal/CalendarForm";
import { Helmet } from "react-helmet-async";

const CalendarPage = () => {
    return (
        <>
            <Helmet>
                <title>juneberrydiary - calendar</title>
            </Helmet>
            <div style={{ position: 'relative', height: '100%' }}>
                <CalendarForm/>
            </div>
        </>
    );
}

export default CalendarPage;