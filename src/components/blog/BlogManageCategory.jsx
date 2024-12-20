import React, { useCallback, useEffect, useState } from 'react';
import styled, {css} from 'styled-components';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, Drag } from "react-beautiful-dnd";
import { useGetAllCategories } from '../../hooks/queries/blog/useGetAllCategories';
import { useAddCategoriesMutation } from '../../hooks/mutations/blog/useAddCategoriesMutation';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import { toast } from 'react-toastify'

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
    const { id: blogId } = useParams()

    const { data: categoryData } = useGetAllCategories(blogId)
    const { mutate: addCategoriesMutate } = useAddCategoriesMutation(blogId)
    
    const [ tempCategories, setTempCategories ] = useState([]);
    const [categoryInputs, setCategoryInputs] = useState([]);
    const [subCategoryInputs, setSubCategoryInputs] = useState(Array.from({ length: tempCategories.length }, () => []));

    const handleCategoryTxtChange = useCallback((index, value) => {
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs[index].text = value
            return newInputs
        })
    }, [])

    const handleSubCategoryTxtChange = useCallback((index, sIndex, value) => {
        setSubCategoryInputs((prevInputs) => {
            const newSubCategoryInputs = [...prevInputs]
            newSubCategoryInputs[index][sIndex] = value;
            return newSubCategoryInputs 
        })
    }, [])

    const handleCategoryConfirmBtn = useCallback((index) => {
        const hasCategoryInput = tempCategories.some(
            (category) => category.categoryName === categoryInputs[index]?.text
        )

        if (hasCategoryInput) {
            alert("중복되는 카테고리 이름이 이미 존재합니다.")
            return
        }
        
        setTempCategories(prev => [...prev, {categoryName: categoryInputs[index]?.text, children: []}])
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs.splice(index, 1)
            return newInputs
        })
    }, [categoryInputs, setTempCategories, tempCategories])

    const handleSubCategoryConfirmBtn = useCallback((index, input) => {
        const hasSubcategoryInput = tempCategories[index + 1]?.children.some(
            (child) => child.subCategoryName === input
        )

        if (hasSubcategoryInput) {
            alert("중복되는 하위 카테고리 이름이 이미 존재합니다.")
            return
        }
        
        setTempCategories((prevCategories) => {
            const newCategories = [...prevCategories]
            newCategories[index + 1]?.children.push({ subCategoryName: input })
            return newCategories
        })
    }, [setTempCategories, tempCategories])

    const handleCategoryDeleteBtn = useCallback((index) => {
        setCategoryInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs.splice(index, 1)
            return newInputs
        })
    }, [])

    const handleSubCategoryDeleteBtn = useCallback((index, sIndex) => {
        setSubCategoryInputs((prev) => {
            const newSubCategoryInputs = [...prev]
            newSubCategoryInputs[index].splice(sIndex, 1);
            return newSubCategoryInputs
        })
    }, [])

    const handleSecondCategoryAddBtn = useCallback((index) => {
       setSubCategoryInputs((prev) => {
            const newSubCategoryInputs = [...prev]
            newSubCategoryInputs[index]?.push("")
            return newSubCategoryInputs;
       })
    }, [])

    const onClickCategoryAddBtn = useCallback(e => {
        setCategoryInputs((prevInputs) => [...prevInputs, {text: ""}]);
        setSubCategoryInputs(prev => [...prev, []]);
    }, [])

    const onClickSaveAllBtn = useCallback(() => {
        addCategoriesMutate(
            {
                blogId,
                categoryInfos: tempCategories
            },
            {
                onSuccess: () => {
                    toast.success("카테고리 저장에 성공했습니다.");
                },
                onError: () => {
                    toast.error("카테고리 저장에 실패했습니다.");
                    return;
                }
            }
        )
    }, [tempCategories, blogId, addCategoriesMutate]);

    const onCategoryDragEnd = useCallback((droppedItem) => {
        if (!droppedItem.destination) return;

        let updatedList = [...tempCategories]
        const [reorderedItem] = updatedList.splice(droppedItem.source.index + 1, 1)
        updatedList.splice(droppedItem.destination.index + 1, 0, reorderedItem)
        setTempCategories(updatedList)
    }, [tempCategories])

    useEffect(() => {
        if (tempCategories) {
            setSubCategoryInputs(Array.from({ length: tempCategories.length }, () => []))
        }
    }, [tempCategories])

    useEffect(() => {
        setTempCategories(categoryData || [])
    }, [categoryData])

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
                            <DragDropContext onDragEnd={onCategoryDragEnd}>
                                <Droppable droppableId="category-container" type="CATEGORY">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {tempCategories.filter(category => category.categoryName !== "").map((category, index) => (
                                            <Draggable key={index} draggableId={`${category?.categoryName}-${index}`} index={index}>
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
                                                        {category?.categoryName}
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
                                                            {category.children?.length > 0 &&
                                                                category.children
                                                                    .filter(child => child.subCategoryName !== "")
                                                                    .map((subCategory, childIndex) => (
                                                                        <Draggable key={`${subCategory?.subCategoryName}-${childIndex}`} draggableId={`child11-${subCategory?.subCategoryName}-${childIndex}`} index={childIndex}>
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
                                                                                            {subCategory?.subCategoryName}
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
                                                            {subCategoryInputs[index] && subCategoryInputs[index].map((subCategoryInput, sIndex) => (
                                                                <CategoryLinearBlock key={sIndex}>
                                                                    <CategoryAddInput value={subCategoryInput} placeholder="하위 카테고리명을 입력하세요." onChange={(e) => handleSubCategoryTxtChange(index, sIndex, e.target.value)} />
                                                                    <CategoryAddBtnGroup>
                                                                        <CategoryBtn onClick={() => handleSubCategoryDeleteBtn(index, sIndex)}>취소</CategoryBtn>
                                                                        <CategoryBtn onClick={() => handleSubCategoryConfirmBtn(index, subCategoryInput)}>확인</CategoryBtn>
                                                                    </CategoryAddBtnGroup>
                                                                </CategoryLinearBlock>
                                                            ))}
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
                    <SaveBtn onClick={onClickSaveAllBtn}>변경사항 저장</SaveBtn>
                </CategoryLowerBlock>
            </CategoryBlock>
        </>
    )
}

export default React.memo(BlogManageCategory);