import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`

const PageButton = styled.button`

`

const Pagination = ({ total, limit, page, setPage }) => {
    if (!total) return null;

    const numPages = Math.ceil(total / limit);

    return (
        <Nav>
            <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </PageButton>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <PageButton
                        key={i + 1} 
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? "page" : undefined}
                    >
                        {i + 1}
                    </PageButton>
                ))}
            <PageButton onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </PageButton>
        </Nav>
    )
}

export default React.memo(Pagination);