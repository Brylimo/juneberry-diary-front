import React, { useCallback, useState } from 'react';
import styled, {css} from 'styled-components';
import { DragDropContext, Droppable, Draggable, Drag } from "react-beautiful-dnd";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';

const BlogMangeHeading = styled.div`
    font-size: 24px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgb(232, 232, 232);
    margin-bottom: 8px;
`

const CategoryBlock = styled.div`
    border: 1px solid #e0e5ee;
    border-radius: 2px;
`

// upper block
const CategoryUpperBlock = styled.div`
    padding: 10px;
`

const CategoryUpperSubBlock = styled.div`
    padding: 10px;
    background-color: #e7edf3;
    margin-top: 25px;
`

const CategoryH2 = styled.h2`
    font-size: 14px;
    font-weight: 400;
`

const CategoryAddBtn = styled.button`
    width: 100%;
    background: transparent;
    border: 1px dotted #acb3bf;
    height: 50px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;
    padding: 0 0 0 20px;
    font-size: 16px;
    font-weight: 300;
`

const CategoryLinearWrapper = styled.div`
    margin-bottom: 20px;
`

const CategoryLinearBlock = styled.div`
    width: 100%;
    background: transparent;
    border: 1px solid #e9edf9;
    font-size: 16px;
    height: 50px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    background-color: #fff;
    border-radius: 2px;
    padding: 0 0 0 20px;
    display: flex;
    justify-content: space-between;
`

const CategorySecondLinearBlock = styled.div`
    width: 100%;
    background: transparent;
    border: 1px solid #e9edf9;
    font-size: 16px;
    height: 50px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    background-color: #fff;
    border-radius: 2px;
    padding: 0 0 0 20px;
    display: flex;
    justify-content: space-between;
`

const CategoryLinearSegment = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const CategoryLinearRight = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CategoryLinearTail = styled.div`
    height: 100%;
    width: 30px;
    background-color: #f1f4f7;
    display: flex;
    align-items: center;
    justify-content: center;
`

const UtilBtn = styled.button`
    height: 25px;
`

const CategoryAddInput = styled.input`
    outline: none;
    border: 1px solid rgb(232, 232, 232);
    height: 35px;
    width: 50%;
    font-size: 16px;
`

const SecondCategoryBlock = styled.div`
    padding-left: 50px;
`

const CategoryAddBtnGroup = styled.div`
    display: flex;
    gap: 5px;
`

const CategoryBtn = styled.button`

`

// lower block
const CategoryLowerBlock = styled.div`
    padding: 10px;
    background-color: #fafbfc;
    display: flex;
    justify-content: end;
`

const SaveBtn = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    padding: 3px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    padding: 8px 6px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;

    &:hover {
        background-color: rgba(0, 0, 0, 1);
    }
`;

const MenuIconCustom = styled(MenuIcon)`
    width: 22px;
    height: 22px;
    color: grey;
`

const AddIconCustom = styled(AddIcon)`
    width: 22px;
    height: 22px;
    color: grey;
`

const CircleIconCustom = styled(CircleIcon)`
    width: 5px;
    height: 5px;
    color: #d8d8d8;
`

const BlogManageCategory = () => {
    const [categoryInputs, setCategoryInputs] = useState([]);

    const [array, setArray] = useState([])

    const handleCategoryTxtChange = useCallback((index, value) => {
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs[index].text = value
            return newInputs
        })
    }, [])

    const handleCategoryConfirmBtn = useCallback((index) => {
        setArray(prev => [...prev, {text: categoryInputs[index]?.text, children: []}])
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs.splice(index, 1)
            return newInputs
        })
    }, [categoryInputs])

    const handleCategoryDeleteBtn = useCallback((index) => {
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs.splice(index, 1)
            return newInputs
        })
    }, [])

    const handleSecondCategoryAddBtn = useCallback((index) => {
        setArray((prevArray) => {
            const newArray = [...prevArray]
            newArray[index]?.children.push("hi")
            console.log(newArray)
            return newArray
        })
    }, [])

    const onClickCategoryAddBtn = useCallback(e => {
        setCategoryInputs((prevInputs) => [...prevInputs, {text: ""}]);
    }, [])

    return (
        <>
            <BlogMangeHeading>카테고리</BlogMangeHeading>
            <CategoryBlock>
                <CategoryUpperBlock>
                    <CategoryH2>카테고리를 추가하고 순서를 변경할 수 있습니다.</CategoryH2>
                    <CategoryUpperSubBlock>
                        <CategoryLinearWrapper>
                            <CategoryLinearBlock style={{ cursor: "default" }}>
                                <CategoryLinearSegment>
                                    <MenuIconCustom />
                                    전체 카테고리
                                </CategoryLinearSegment>
                            </CategoryLinearBlock>
                            <DragDropContext>
                                <Droppable droppableId="category-container" type="CATEGORY">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {array.map((elem, index) => (
                                            <Draggable key={index} draggableId={`${elem.text}-${index}`} index={index}>
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                              >
                                                <CategoryLinearBlock>
                                                    <CategoryLinearSegment>
                                                        <div {...provided.dragHandleProps}>
                                                            <MenuIconCustom/>
                                                        </div>
                                                        {elem.text}
                                                    </CategoryLinearSegment>
                                                    <CategoryLinearRight>
                                                        <UtilBtn onClick={() => handleSecondCategoryAddBtn(index)}>추가</UtilBtn>
                                                        <CategoryLinearTail>
                                                            <CircleIconCustom />
                                                        </CategoryLinearTail>
                                                    </CategoryLinearRight>
                                                </CategoryLinearBlock>
                                                <Droppable droppableId="second-category-container" type={`SUBCATEGORY`}>
                                                    {(p) => (
                                                        <SecondCategoryBlock ref={p.innerRef} {...p.droppableProps}>
                                                            {elem.children?.length > 0 &&
                                                                elem.children.map((txt, childIndex) => (
                                                                    <Draggable key={`${txt}-${childIndex}`} draggableId={`child11-${txt}-${childIndex}`} index={childIndex}>
                                                                        {(provided) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                            >
                                                                                <CategoryLinearBlock>
                                                                                    <CategoryLinearSegment>
                                                                                        <div {...provided.dragHandleProps}>
                                                                                            <MenuIconCustom />
                                                                                        </div>
                                                                                        {txt}
                                                                                    </CategoryLinearSegment>
                                                                                    <CategoryLinearRight>
                                                                                        <UtilBtn>추가</UtilBtn>
                                                                                        <CategoryLinearTail>
                                                                                            <CircleIconCustom />
                                                                                        </CategoryLinearTail>
                                                                                    </CategoryLinearRight>
                                                                                </CategoryLinearBlock>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))
                                                            }
                                                            {p.placeholder}
                                                        </SecondCategoryBlock>
                                                    )}
                                                </Droppable>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {categoryInputs.map((value, index) => (
                                <CategoryLinearBlock key={index}>
                                    <CategoryAddInput value={value.text} placeholder="카테고리명을 입력하세요." onChange={(e) => handleCategoryTxtChange(index, e.target.value)} />
                                    <CategoryAddBtnGroup>
                                        <CategoryBtn onClick={() => handleCategoryDeleteBtn(index)}>취소</CategoryBtn>
                                        <CategoryBtn onClick={() => handleCategoryConfirmBtn(index)}>확인</CategoryBtn>
                                    </CategoryAddBtnGroup>
                                </CategoryLinearBlock>
                            ))}
                        </CategoryLinearWrapper>
                        <CategoryAddBtn onClick={onClickCategoryAddBtn}>
                            <AddIconCustom />
                            카테고리 추가
                        </CategoryAddBtn>
                    </CategoryUpperSubBlock>
                </CategoryUpperBlock>
                <CategoryLowerBlock>
                    <SaveBtn>변경사항 저장</SaveBtn>
                </CategoryLowerBlock>
            </CategoryBlock>
        </>
    )
}

export default BlogManageCategory;