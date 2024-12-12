import React from 'react';
import styled, { css } from 'styled-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const BlogManageBlock = styled.div`
    max-width: 1150px;
    padding: 24px 40px 0px 40px;
    margin: 0 auto;

    ${({ theme }) => theme.sm`
        width: 100%;
    `};
`

const BlogManageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    margin-bottom: 24px;
`

const BlogMangeBody = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    ${({ theme }) => theme.sm`
        flex-direction: column;
    `};
`

const BlogManageHeaderLeft = styled.div`
    display: flex;
    align-items: center;
`

const BlogImage = styled.div`
    background-color: black;
    width: 50px;
    height: 50px;
    margin-right: 20px;
`

const BlogName = styled.div`
    font-size: 30px;
    font-weight: 400;
`

const BlogManageSideBar = styled.div`
    flex: 1;
    padding-right: 24px;
    max-width: 296px;

    ${({ theme }) => theme.sm`
        margin-bottom: 30px;
        padding-right: 0;
        min-width: 100%;
    `};
`

const BlogManageMain = styled.div`
    flex: 3;
`

const SidebarUl = styled.ul`
    list-style: none;
`

const SidebarLi = styled.li`
    border-radius: 6px;
    list-style: none;
    position: relative;
    background-color: #ffffff00;
    padding: 6px 8px;
    color: #25292e;
    text-align: left;

    &:hover {
        background-color: #818b981a;
    }

    ${props =>
        props.active &&
        css`
            background-color: #818b981a;
            font-weight: 500;

            &:after {
                content: "";
                position: absolute;
                background: green;
                width: 4px;
                height: 24px;
                left: -8px;
                top: 3px;
            }
        `
    }
`

const SideBarTxt = styled.div`
    font-size: 16px;
    font-weight: 400;
`

const BlogManageSection = ({ blogName }) => {
    const { pathname } = useLocation();
    const { id: blogId } = useParams()

    return (
        <BlogManageBlock>
            <BlogManageHeader>
                <BlogManageHeaderLeft>
                    <BlogImage />
                    <BlogName>{blogName}</BlogName>
                </BlogManageHeaderLeft>
            </BlogManageHeader>
            <BlogMangeBody>
                <BlogManageSideBar>
                    <SidebarUl>
                        <SidebarLi active={pathname === `/blog/${blogId}/manage/category`}>
                            <Link to={`/blog/${blogId}/manage/category`}>
                                <SideBarTxt>카테고리</SideBarTxt> 
                            </Link>
                        </SidebarLi>
                    </SidebarUl>
                </BlogManageSideBar>
                <BlogManageMain>
                    <Outlet/>
                </BlogManageMain>
            </BlogMangeBody>
        </BlogManageBlock>
    );
}

export default BlogManageSection;