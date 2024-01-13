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
    color: #b95de2;
    font-weight: bold;
    font-size: 2rem;
`;

const LeftWrapper = styled.div`
    display: flex;
    text-align: center;
`;

const FontWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IconSpan = styled.span`
    cursor: pointer;
    line-height: 100%;
`;

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    return (
        <HeaderFrame>
           <LeftWrapper>
                <FontWrapper>
                    <IconSpan onClick={prevMonth}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconSpan>
                </FontWrapper>
                <div style={{width: "6.6rem"}}>
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