import React, { useCallback } from "react";
import styled, { css } from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`

const PageButton = styled.button`
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    color: #333;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    ${props => props.active &&
        css`
            background-color: black;
            color: #fff;
            border: none;
            cursor: default;
        `
    }

    &:hover {
        ${props => !props.active &&
            css`
                background-color: #ddd;
            `
        }
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #aaa;
        border-color: #ccc;
        cursor: not-allowed;
    }
`

const Pagination = ({ total, limit, page, setPage, callback }) => {
    if (!total) return null;

    const numPages = Math.ceil(total / limit);

    const handleBtnClick = (page) => {
        if (callback) callback(page)
        setPage(page)
    }

    return (
        <Nav>
            <PageButton onClick={() => handleBtnClick(page - 1)} disabled={page === 1}>
                &lt;
            </PageButton>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <PageButton
                        key={i + 1} 
                        onClick={() => handleBtnClick(i + 1)}
                        active={page === i + 1}
                        aria-current={page === i + 1 ? "page" : undefined}
                    >
                        {i + 1}
                    </PageButton>
                ))}
            <PageButton onClick={() => handleBtnClick(page + 1)} disabled={page === numPages}>
                &gt;
            </PageButton>
        </Nav>
    )
}

export default React.memo(Pagination);