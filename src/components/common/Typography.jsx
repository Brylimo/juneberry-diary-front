import React from 'react';
import styled from 'styled-components';

const TypographyBlock = styled.div`
    font-family: monospace;

    h1 {
        font-weight: bold;
        font-size: 32px;
    }
    h2 {
        font-weight: bold;
        font-size: 28px;
    }
    h3 {
        font-weight: bold;
        font-size: 24px;
    }
    h4 {
        font-weight: bold;
        font-size: 22px;
    }
    img {
        width: 100%;
    }
`;

const Typography = ({ children }) => {
    return <TypographyBlock>{children}</TypographyBlock>
}

export default Typography;