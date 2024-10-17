import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
    margin-top: 7rem;
    background-color: #f0f0f0;
    padding: 18px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.24px;
`

const Footer = () => {
    return (
        <FooterBlock>
            Copyright © chaejin All Rights Reserved.
        </FooterBlock>);
}

export default Footer;