import React from 'react';
import styled, { css } from 'styled-components';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const ToolbarBlock = styled.div`
    width: 100%;
    background-color: white;
    height: 3.5rem;
    border-bottom: 1px solid #d0d7de;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    gap: 0.5rem;
    position: fixed;
    z-index: 500000;
`;

const ToolbarItem = styled.div`
    height: 3rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #868E96;
    justify-content: center;

    &:hover {
        color: #802480;
    }
`;

const Heading = styled.div`
    width: 3rem;
    font-size: 1.8rem;
    font-weight: bold;
    font-family: serif;
    text-align: center; 
    span {
        font-size: 1.35rem;
    }
`;

const Bar = styled.div`
    width: 1px;
    height: 1.6rem;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    background: #d0d7de;
`;

const FormatBoldIconCustom = styled(FormatBoldIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    }
`;

const FormatItalicIconCustom = styled(FormatItalicIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const FormatStrikethroughIconCustom = styled(FormatStrikethroughIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const FormatQuoteIconCustom = styled(FormatQuoteIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const Toolbar = () => {
    return (
    <ToolbarBlock>
        <ToolbarItem>
            <Heading>
                H<span>1</span>
            </Heading>
        </ToolbarItem>
        <ToolbarItem>
            <Heading>
                H<span>2</span>
            </Heading>
        </ToolbarItem>
        <ToolbarItem>
            <Heading>
                H<span>3</span>
            </Heading>
        </ToolbarItem>
        <ToolbarItem>
            <Heading>
                H<span>4</span>
            </Heading>
        </ToolbarItem>
        <Bar />
        <ToolbarItem>
            <FormatBoldIconCustom />
        </ToolbarItem>
        <ToolbarItem>
            <FormatItalicIconCustom  />
        </ToolbarItem>
        <ToolbarItem>
            <FormatStrikethroughIconCustom />
        </ToolbarItem>
        <Bar />
        <ToolbarItem>   
            <FormatQuoteIconCustom />
        </ToolbarItem>
    </ToolbarBlock>);
};

export default Toolbar;