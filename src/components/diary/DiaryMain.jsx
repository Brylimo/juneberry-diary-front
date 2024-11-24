import React from 'react';
import styled from 'styled-components';

const DiaryMainWrapper = styled.div`
    width: 100%;
    margin-top: 8rem;
    height: auto;
    min-height: calc(100vh - 8rem);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    font-size: 20px;
`;

const DiaryMain = () => {

    return (
        <DiaryMainWrapper>
            <div style={{fontSize: "65px", marginBottom: "20px"}}>(˘･_･˘)</div>
            diary 페이지는 현재 공사중에 있어요. 🚧
        </DiaryMainWrapper>
    )
}

export default DiaryMain;