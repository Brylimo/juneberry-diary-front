import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useGetAllCategories } from '../../hooks/queries/blog/useGetAllCategories';
import { useGetAllTagsQuery } from '../../hooks/queries/blog/useGetAllTagsQuery';
import { Outlet } from 'react-router-dom';

const BlogListWrapper = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const BlogListBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const AreaMain = styled.div`
    width: 70%;
    margin-top: 4rem;

    ${({ theme }) => theme.md`
        width: 92%;
    `};
`

const AreaSide = styled.div`
    width: 230px;
    margin: 32px 0 0 40px;

    ${({ theme }) => theme.md`
        display: none;
    `};
`

// area-side
const SidebarTitle = styled.div`
    display: block;
    margin: 0 0 7px 0;
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
    color: #333;
`

const TagBlock = styled.div`

`

const BlogCategory = styled.div`
    font-size: 14px;
    margin-bottom: 10px;
    color: #8f9ca8;
    cursor: pointer;

    ${props => props.type === 'sub' &&
        css`
            padding-left: 10px;
        `
    }

    &:hover {
        color: #bb86fc;
    }
`

const BoxTag = styled.div`
    white-space: normal;
`

const BlogTag = styled.span`
    display: inline-block;
    font-size: 13px;
    line-height: 1.69;
    margin-right: 4px;
    margin-bottom: 4px;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover {
        color: #bb86fc;
    }

    &:last-of-type::after {
        content: '';
        position: absolute;
        top: 12px;
        right: -2px;
        width: 5px;
        height: 5px;
        background: #fff;
    }
`

const BlogListSection = () => {
    const { id: blogId } = useParams()
    const [categories, setCategories] = useState([])

    const { data: categoryData } = useGetAllCategories(blogId)
    const { data: blogTagList } = useGetAllTagsQuery({blogId: blogId})

    useEffect(() => {
        if (categoryData) {
            const optionList = []

            categoryData.categoryInfoList.forEach((item) => {
                if (item.categoryName === '') {
                    optionList.push({
                        type: "category",
                        text: "전체 카테고리",
                        category: "",
                        subCategory: "",
                        count: categoryData.total
                    })
                } else {
                    
                    // 1차. 카테고리
                    optionList.push({
                        type: "category",
                        text: item.categoryName,
                        category: item.categoryName,
                        subCategory: "",
                        count: item.count
                    })

                    // 2차. 하위 카테고리
                    item.children.filter(subItem => !!subItem.subCategoryName).forEach((subItem) => {
                        optionList.push({
                            type: "sub",
                            text: `- ${subItem.subCategoryName}`,
                            category: item.categoryName,
                            subCategory: subItem.subCategoryName,
                            count: subItem.count
                        })
                    })
                }
            })

            setCategories(optionList)
        }
    }, [categoryData])

    return (
        <BlogListWrapper>
            <BlogListBlock>
                <AreaMain>
                    <Outlet />
                </AreaMain>
                <AreaSide>
                <TagBlock>
                    <SidebarTitle>Category</SidebarTitle>
                        <div>
                            {
                                categories?.map(category => (
                                    <BlogCategory type={category.type}>
                                        {(category.category && category.subCategory) ? (
                                            <Link to={`/blog/${blogId}/category/${category.category}/${category.subCategory}`}>
                                                {category.text} ({category?.count})
                                            </Link>
                                        ) : (category.category) ? (
                                            <Link to={`/blog/${blogId}/category/${category.category}`}>
                                                {category.text} ({category?.count})
                                            </Link>
                                        ) : (
                                            <Link to={`/blog/${blogId}/category`}>
                                                {category.text} ({category?.count})
                                            </Link>
                                        )}
                                    </BlogCategory>
                                ))
                            }
                        </div>
                    </TagBlock>
                    <TagBlock>
                        <SidebarTitle>Tag</SidebarTitle>
                        <BoxTag>
                        {
                            blogTagList?.map(tag => (
                                <BlogTag>
                                    <Link to={`/blog/${blogId}/tag/${tag.name}`}>
                                        {tag.name}, 
                                    </Link>
                                </BlogTag>
                            ))
                        }
                        </BoxTag>
                    </TagBlock>
                </AreaSide>
            </BlogListBlock>
        </BlogListWrapper>
    )
}

export default BlogListSection;
