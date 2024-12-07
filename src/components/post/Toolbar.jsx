import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoIcon from '@mui/icons-material/Photo';

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
    top: ${({ headerTop }) => `${headerTop}px`};
    z-index: 31;
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

const CodeIconCustom = styled(CodeIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const InsertLinkIconCustom = styled(InsertLinkIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const PhotoIconCustom = styled(PhotoIcon)`
    font-size: 2.3rem;
    color: #868E96;
    &:hover {
        color: #802480;
    } 
`;

const Toolbar = ({ onToolbarItemClick }) => {
    const [headerTop, setHeaderTop] = useState(80);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
        
            // 스크롤 다운 시 header top을 0으로 설정
            if (currentScrollY > 80) {
                setHeaderTop(0)
            } else if (currentScrollY > 0) {
                setHeaderTop(80 - currentScrollY)
            } else {
                setHeaderTop(80)
            }
         };
    
        // 스크롤 이벤트 리스너 추가
        window.addEventListener("scroll", handleScroll);
    
        // 클린업 함수로 리스너 제거
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ToolbarBlock headerTop={headerTop}>
            <ToolbarItem onClick={() => onToolbarItemClick('heading1')}>
                <Heading>
                    H<span>1</span>
                </Heading>
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('heading2')}>
                <Heading>
                    H<span>2</span>
                </Heading>
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('heading3')}>
                <Heading>
                    H<span>3</span>
                </Heading>
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('heading4')}>
                <Heading>
                    H<span>4</span>
                </Heading>
            </ToolbarItem>
            <Bar />
            <ToolbarItem onClick={() => onToolbarItemClick('bold')}>
                <FormatBoldIconCustom />
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('italic')}>
                <FormatItalicIconCustom  />
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('strike')}>
                <FormatStrikethroughIconCustom />
            </ToolbarItem>
            <Bar />
            <ToolbarItem onClick={() => onToolbarItemClick('quote')}>
                <FormatQuoteIconCustom />
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('link')}>
                <InsertLinkIconCustom />
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('image')}>
                <PhotoIconCustom />
            </ToolbarItem>
            <ToolbarItem onClick={() => onToolbarItemClick('code')}>
                <CodeIconCustom />
            </ToolbarItem>
        </ToolbarBlock>);
};

export default Toolbar;