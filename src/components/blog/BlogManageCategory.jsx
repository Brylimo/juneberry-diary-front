import React from 'react';
import styled, {css} from 'styled-components';

const BlogMangeHeading = styled.div`
    font-size: 24px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgb(232, 232, 232);
    margin-bottom: 8px;
`

const CategoryBlock = styled.div`

`

const BlogManageCategory = () => {
    return (
        <>
             <BlogMangeHeading>카테고리</BlogMangeHeading>
            <CategoryBlock>
                카테고리
            </CategoryBlock>
        </>
    )
}

export default BlogManageCategory;