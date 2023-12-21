import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const HeaderFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const LeftSideSpan = styled.span`
    color: ${(props) => props.color || '#b95de2'};
    font-weight: bold;
    font-size: 25px;
    margin-left: 7px;
    margin-right: 7px;
`;

const YearSpan = styled.span`
    color: var(--main-color);
    font-weight: bold;
    font-size: 20px;
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
                        <FontAwesomeIcon icon={faCaretLeft} size="lg" style={{color:"#b95de2"}} />
                    </IconSpan>
                </FontWrapper>
                <div>
                    <LeftSideSpan>{monthNames[currentMonth.getMonth()]}</LeftSideSpan>
                </div>
                <FontWrapper>
                    <IconSpan onClick={nextMonth}>
                        <FontAwesomeIcon icon={faCaretRight} size="lg" style={{color:"#b95de2"}} />
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