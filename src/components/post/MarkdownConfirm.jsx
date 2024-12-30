import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, {css} from 'styled-components';
import MarkdownRenderer from './MarkdownRenderer';

const MarkdownConfirmWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const PostPreviewBlock = styled.div`
    flex: 1;
    overflow: hidden;

    @media (max-width: 893px) {
        display:none;
    }
`;

const PostPreview = styled.div`
    padding: 3rem 2rem 2rem 3rem;
    height: calc(100vh - 8rem);
`

const PostConfigBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PostConfig = styled.div`
    padding: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const PreviewLine = styled.div`
    width: 0.1px;
    height: calc(100vh - 8rem);
    background-color: #d0d7de;

    @media (max-width: 893px) {
        display:none;
    }
`

const PublishPage = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    background-color: #fffcfb;
    padding: 5rem 5rem 0 5rem;
    height: 100%;
    flex: 1;
    overflow: auto;
    height: calc(100% - 5rem);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 893px) {
        width: 100%;
    }
`;

const PreviewTitle = styled.div`
    outline: none;
    padding: 0, 0, 0.5rem 0;
    border: none;
    border-bottom: 1px solid #e5e9f2;
    margin-bottom: 2rem;
    width: 100%;
    background: transparent;
    font-size: 32px;
    white-space: normal;
    word-wrap: break-word;
    word-break: normal;
    resize: none;
    overflow: hidden;
    font-family: monospace;
    min-height: 46px;
    height: 42px;
    font-weight: 400;
`;

const MarkdonwRenderBlock = styled.div`
    font-size: 16px;
    font-family: monospace;
    word-break: normal;
    word-wrap: break-word;

    & menu, ol, ul {
        list-style: auto;
        list-style-position: inside;
    }
`;

const PostPreviewHeaderBlock = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
`

const PostPreviewHeader = styled.span`
    font-weight: bold;
    font-size: 32px;
    color: cadetblue;
`;

const PostConfigMenuBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const PostConfigMenu = styled.span`
    font-size: 18px;
    font-weight: 400;
    color: #bbc1c7;
    cursor: pointer;

    ${
        props => props.currentMenu && css`
            color: orange;    
        `
    };
`

const PostConfigMenuWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const PostConfigContent = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    flex: 1;
`;

const PostConfigCellWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const PostConfigCellInfo = styled.div`
    display: flex;
    justify-content: end;
`

const PostConifgCellLinkBlock = styled.div`
    display: flex;
    gap: 5px;
    width: calc((100% - 109px) * 0.7);
`

const PostConfigCellLink = styled.span`
    font-size: 16px;
    cursor: pointer;
    color: #868E96;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`

const PostConfigCellSpan = styled.span`
    font-size: 16px;
    line-height: 16px;
    color: #868E96;
`

const PostConfigCell = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
`;

const PostConfigSegBlock = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 5px;
`

const PostConfigImg = styled.div`
    background-color: #e9ecef;
    width: 70%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${
        props => props.height && css`
            height: ${props.height}px;    
        `
    };
`;

const PostThumbnailImg = styled.img`
    width: 70%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${
        props => props.height && css`
            height: ${props.height}px;    
        `
    };
`;

const ImgImage = styled.img`
    width: 45%;
`

const ImgBtn = styled.button`
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.125s ease-in 0s;
    background-color: #fff;
    color: green;
    border: none;
    width: 45%;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        opacity: 0.7
    }
`

const CellHeader = styled.div`
    font-size: 24px;
    display: flex;
    align-items: center;
    width: 109px;
`

const PostTextarea = styled.textarea`
    width: 70%;
    border: none;
    padding: 1rem;
    resize: none;
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const HashTagWrapper = styled.div`
    width: 70%;
    border: none;
    padding: 1rem;
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    height: 144px;
    display: flex;
    overflow-y: auto;
`

const ConfigBtnWrapper = styled.div`
    width: 70%;
    display: flex;
    gap: 3rem;
`

const PostConfigBtn = styled.button`
    padding: 1.5rem 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: transparent;
    border: none;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 0.8px 1.8px 0 rgba(0,0,0,.2);
    color: #868E96;
    font-weight: 400;
    flex: 1;
    font-size: 16px;
    border: 1px solid transparent;

    &:hover {
        opacity: 0.7;
    }

    ${
        props => props.active && css`
            border: 1px solid cadetblue;
            color: cadetblue;
        `
    };
`

const HashTagBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: wrap;
    height: 25px;
`

const HashTagInputBlock = styled.div`
    padding: 0.1rem 0;
    font-size: 18px;
    flex: 1;
`

const HashTagInput = styled.input`
    border: none;
    outline: none;
    font-family: monospace;
    box-sizing: content-box;
`;

const TextareaCntSpan = styled.span`
    font-size: 16px;
    color: #868E96
`;

const HashTagBadge = styled.span`
    background-color: #F5F5F5;
    color: green;
    font-size: 16px;
    padding: 0.1rem 1.5rem;
    border-radius: 7px;
    cursor: default;
    font-weight: 400;
`

const PostSelectBtn = styled.button`
    padding: 1rem 2rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
    border: none;
    color: white;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.8);

    &:hover {
            background-color: rgba(0, 0, 0, 1);
    }
`;

const MarkdownConfirm = ({ 
        title, 
        description, 
        mrkdown,
        tags,
        isPublic,
        thumbnailURL, 
        onChangeField, 
        onClickPublishBtn,
        onClickImgBtn,
        handleThumbnailReUpload,
        handleThumbnailDelete 
    }) => {

    const [currentMenu, setCurrentMenu] = useState("thumbnail");
    const [imgBlockWidth, setImgBlockWidth] = useState(0);
    const [tagTxt, setTagTxt] = useState("")

    const postConfigImgBlockRef = useRef(null);

    const updatePostConfigImgHeight = useCallback(() => {
        if (postConfigImgBlockRef.current) {
            const { width } = postConfigImgBlockRef.current.getBoundingClientRect();
            setImgBlockWidth(width);
        }
    }, [])

    const onClickThumbnailMenu = useCallback(() => {
        setCurrentMenu("thumbnail")
    }, []);

    const onClickTagMenu = useCallback(() => {
        setCurrentMenu("tag")
    }, []);

    const onClickPublicBtn = useCallback(() => {
        onChangeField({ key: 'isPublic', value: true });
    }, [onChangeField]);

    const onClickPrivateBtn = useCallback(() => {
        onChangeField({ key: 'isPublic', value: false });
    }, [onChangeField]);

    const handleDescriptionChange = useCallback((event) => {
        if (event.target.value?.length <= 150) {
            onChangeField({ key: 'description', value: event.target.value })
        }
    }, [onChangeField])

    const handlePostTxtKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }, [])

    const handleHashTagTxtChange = useCallback((event) => {
        setTagTxt(event.target.value)
    }, [])

    const handleHashTagTxtKeyDown = useCallback((event) => {
        if (event.key === 'Enter' && event.nativeEvent.isComposing === false && tagTxt.trim() !== '') {
            const regex = /[^\p{L}\p{N}\p{Zs}]/u; // 특수문자 확인
            const tagText = tagTxt.trim()

            // 이미 등록된 태그면 무시
            if (tags.includes(tagText)) {
                setTagTxt('')
                return
            }

            if (tags.length < 10 && !regex.test(tagText)) {
                onChangeField({ key: 'postTags', value: [...tags, tagText]})
            }
            setTagTxt('')
        } else if (event.key === 'Backspace') {
            const tagText = tagTxt.trim();

            if (tagText.length === 0) { // tagText가 비어있을 때만 삭제 가능
                onChangeField({ key: 'postTags', value: tags.slice(0, tags.length - 1)})
            }
        }
    }, [tags, tagTxt, onChangeField])

    useEffect(() => {
        window.addEventListener('resize', updatePostConfigImgHeight);

        return () => {
            window.removeEventListener('resize', updatePostConfigImgHeight);
        }
    }, [updatePostConfigImgHeight])

    return (
        <MarkdownConfirmWrapper>
            <PostPreviewBlock>
                <PostPreview>
                    <PostPreviewHeaderBlock>
                        <PostPreviewHeader>포스트 미리보기</PostPreviewHeader>
                    </PostPreviewHeaderBlock>
                    <PublishPage>
                        <PreviewTitle>{title}</PreviewTitle>
                        <MarkdownRenderer markdown={mrkdown} />
                    </PublishPage>
                </PostPreview>
            </PostPreviewBlock>
            <PreviewLine />
            <PostConfigBlock>
                <PostConfig>
                    <PostPreviewHeaderBlock>
                        <PostPreviewHeader>포스트 설정</PostPreviewHeader>
                        <PostConfigMenuWrapper>
                            <PostConfigMenuBlock>
                                <PostConfigMenu onClick={onClickThumbnailMenu} currentMenu={currentMenu === 'thumbnail'}>썸네일</PostConfigMenu>
                                <div style={{ color: 'gray' }}>•</div>
                                <PostConfigMenu onClick={onClickTagMenu} currentMenu={currentMenu === 'tag'}>설정</PostConfigMenu>
                            </PostConfigMenuBlock>
                            <PostSelectBtn onClick={onClickPublishBtn}>발행하기</PostSelectBtn>
                        </PostConfigMenuWrapper>
                    </PostPreviewHeaderBlock>
                    {currentMenu === 'thumbnail' ? 
                        (<PostConfigContent>
                            <div style={{ width: '100%' }}>
                                <PostConfigCellWrapper>
                                    {thumbnailURL && (<PostConfigCellInfo>
                                        <PostConifgCellLinkBlock>
                                            <PostConfigCellLink onClick={handleThumbnailReUpload}>재업로드</PostConfigCellLink>
                                            <PostConfigCellSpan>•</PostConfigCellSpan>
                                            <PostConfigCellLink onClick={handleThumbnailDelete}>삭제</PostConfigCellLink>
                                        </PostConifgCellLinkBlock>
                                    </PostConfigCellInfo>)}
                                    <PostConfigCell>
                                        <CellHeader>
                                            대표 이미지
                                        </CellHeader>
                                        <PostConfigSegBlock>
                                            {thumbnailURL ? 
                                            (<PostThumbnailImg ref={postConfigImgBlockRef} src={thumbnailURL} height={imgBlockWidth * 0.6} />) :
                                            (<PostConfigImg ref={postConfigImgBlockRef} height={imgBlockWidth * 0.6}>
                                                <ImgImage alt="img icon" src="/image-icon.svg" />
                                                <ImgBtn type="button" onClick={onClickImgBtn}>대표 이미지</ImgBtn>
                                            </PostConfigImg>)}
                                        </PostConfigSegBlock>
                                    </PostConfigCell>
                                </PostConfigCellWrapper>
                                <PostConfigCell>
                                    <CellHeader>
                                        설명
                                    </CellHeader>
                                    <PostConfigSegBlock>
                                        <PostTextarea 
                                            placeholder='포스트를 짧게 소개해보세요.' 
                                            rows='8' 
                                            value={description} 
                                            onChange={handleDescriptionChange} 
                                            onKeyDown={handlePostTxtKeyDown} 
                                        />
                                        <TextareaCntSpan>{description.length}/150</TextareaCntSpan>
                                    </PostConfigSegBlock>
                                </PostConfigCell>
                            </div>
                        </PostConfigContent>) :
                        (<PostConfigContent>
                            <div style={{ width: '100%' }}>
                                <PostConfigCell>
                                    <CellHeader>
                                        태그 설정
                                    </CellHeader>
                                    <PostConfigSegBlock>
                                        <HashTagWrapper>
                                            <HashTagBlock>
                                                {tags.map((tag, index) => (
                                                    <HashTagBadge>{tag}</HashTagBadge>
                                                ))}
                                                <HashTagInputBlock>
                                                    <HashTagInput 
                                                        placeholder='태그를 입력하세요.' 
                                                        value={tagTxt} 
                                                        onChange={handleHashTagTxtChange} 
                                                        onKeyDown={handleHashTagTxtKeyDown}
                                                    />
                                                </HashTagInputBlock>
                                            </HashTagBlock>
                                        </HashTagWrapper> 
                                        <TextareaCntSpan>{tags.length}/10</TextareaCntSpan>
                                    </PostConfigSegBlock> 
                                </PostConfigCell>
                                <PostConfigCell>
                                    <CellHeader>공개 설정</CellHeader>
                                    <PostConfigSegBlock>
                                        <ConfigBtnWrapper>
                                            <PostConfigBtn onClick={onClickPublicBtn} active={isPublic}>전체 공개</PostConfigBtn>
                                            <PostConfigBtn onClick={onClickPrivateBtn} active={!isPublic}>비공개</PostConfigBtn>
                                        </ConfigBtnWrapper>
                                    </PostConfigSegBlock>
                                </PostConfigCell>
                            </div>
                        </PostConfigContent>)
                    } 
                </PostConfig>
            </PostConfigBlock>
        </MarkdownConfirmWrapper>
    )
}

export default React.memo(MarkdownConfirm);