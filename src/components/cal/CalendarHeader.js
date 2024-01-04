import styled from "styled-components";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const HeaderFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const LeftSideSpan = styled.span`
    color: ${(props) => props.color || '#b95de2'};
    font-weight: bold;
    font-size: 25px;
    margin-left: 0.7rem;
    margin-right: 0.7rem;
`;

const YearSpan = styled.span`
    color: var(--main-color);
    font-weight: bold;
    font-size: 2rem;
`;

const LeftWrapper = styled.div`
    display: flex;
`;

const FontWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IconSpan = styled.span`
    cursor: pointer;
`;

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    // const today = new Date();

    return (
        <HeaderFrame>
           <LeftWrapper>
                <FontWrapper>
                    <IconSpan onClick={prevMonth}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconSpan>
                </FontWrapper>
                <div>
                    <LeftSideSpan>{monthNames[currentMonth.getMonth()]}</LeftSideSpan>
                </div>
                <FontWrapper>
                    <IconSpan onClick={nextMonth}>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconSpan>
                </FontWrapper>
            </LeftWrapper> 
            <div>
                <YearSpan>{currentMonth.getFullYear()}</YearSpan>
            </div>
        </HeaderFrame>
    );
}

export default CalendarHeader;