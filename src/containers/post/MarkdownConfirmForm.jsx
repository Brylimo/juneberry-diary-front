import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/publish';
import { useAddPostMutation } from '../../hooks/mutations/post/useAddPostMutation';
import { useUpdatePostMutation } from '../../hooks/mutations/post/useUpdatePostMutation';
import { useQueryClient } from '@tanstack/react-query';
import MarkdownConfirm from '../../components/post/MarkdownConfirm';
import { useImgUpload } from '../../hooks/useImgUpload';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function replaceEmptyLinesWithBr(text) {
    const lines = text.split('\n');

    const processedLines = lines.map((line, index) => {
        const isBlankLine = line.trim() === '';
        return isBlankLine ? '\u200B' : line;
    });
    const processedText = processedLines.join('\n');

    return processedText;
}

const MarkdownConfirmForm = () => {
    const { id: blogId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category, subCategory, title, description, mrkdown, tags, isPublic, postId, thumbnailPath } = useSelector(({ publish }) => ({
        category: publish.category,
        subCategory: publish.subCategory,
        title: publish.title,
        description: publish.description,
        mrkdown: publish.mrkdown,
        tags: publish.postTags,
        isPublic: publish.isPublic,
        postId: publish.postId,
        thumbnailPath: publish.thumbnailPath
    }));
    const [thumbnailURL, setThumbnailURL] = useState(thumbnailPath);

    const [imgFile, imgUpload, setImgFile] = useImgUpload();
    const { mutateAsync: addPostMutateAsync } = useAddPostMutation();
    const { mutate: updatePostMutate } = useUpdatePostMutation();

    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload)), [dispatch]);

    const onClickPublishBtn = useCallback(
        async () => {
            if (!title || !mrkdown) {
                toast.error("제목 또는 내용이 비어있습니다.")
                return
            }

            let id = postId;
            if (!id) { // postId 존재하지 않음
                await addPostMutateAsync(
                    {
                        date: new Date(),
                        category: category,
                        subCategory: subCategory,
                        title: title,
                        description: description,
                        content: mrkdown,
                        thumbnailPath: thumbnailURL,
                        blogId: blogId,
                        isTemp: false,
                        isPublic: isPublic,
                        tags: tags,
                        thumbnailImg: imgFile
                    },
                    {
                        onSuccess: (res) => {
                            id = res.data.id
                            const updateDtString = res.data.updatedDateTime
                            const [datePart, timePart] = updateDtString.split(' ')
                            const [year, month, day] = datePart.split('.').map(Number)
                            const [hours, minutes] = timePart.split(':').map(Number)

                            let parsedUpdateDt = null
                            if (year && month && day && hours && minutes) {
                                parsedUpdateDt = new Date(year, month - 1, day, hours, minutes)
                            }

                            onChangeField({ key: 'postId', value: id });
                            onChangeField({ key: 'updateDt', value: parsedUpdateDt });

                            queryClient.invalidateQueries({ queryKey: ["getPostList"]})
                            navigate(`/blog/${blogId}`, { replace: true })
                        },
                        onError: () => {
                            toast.error("포스트 발행에 실패했습니다.")
                            return;
                        }
                    }
                )
                return;
            } else { // postId 존재
                updatePostMutate(
                    {
                        postId: id,
                        category: category,
                        subCategory: subCategory,
                        title: title,
                        description: description,
                        content: mrkdown,
                        thumbnailPath: thumbnailURL,
                        blogId: blogId,
                        isTemp: false,
                        isPublic: isPublic,
                        tags: tags,
                        thumbnailImg: imgFile
                    },
                    {
                        onSuccess: (res) => {
                            const updateDtString = res.data.updatedDateTime
                            const [datePart, timePart] = updateDtString.split(' ')
                            const [year, month, day] = datePart.split('.').map(Number)
                            const [hours, minutes] = timePart.split(':').map(Number)
    
                            let parsedUpdateDt = null
                            if (year && month && day && hours && minutes) {
                                parsedUpdateDt = new Date(year, month - 1, day, hours, minutes)
                            }
    
                            onChangeField({ key: 'updateDt', value: parsedUpdateDt });

                            queryClient.invalidateQueries({ queryKey: ["getPostList"]})
                            navigate(`/blog/${blogId}`, { replace: true })
                        },
                        onError: () => {
                            toast.error("포스트 발행에 실패했습니다.")
                            return;
                        }
                    })
            }
        },
        [blogId, category, subCategory, thumbnailURL, imgFile, description, isPublic, mrkdown, title, postId, tags, onChangeField, addPostMutateAsync, updatePostMutate, navigate, queryClient])

    const onClickImgBtn = useCallback(() => {
        imgUpload()
    }, [imgUpload])

    const handleThumbnailReUpload = useCallback((event) => {
        imgUpload();
    }, [imgUpload])

    const handleThumbnailDelete = useCallback((event) => {
        setThumbnailURL(null);
    }, [setThumbnailURL])

    useEffect(() => {
        if (imgFile) {
            setThumbnailURL(URL.createObjectURL(imgFile))
        }
    }, [imgFile])

    return <MarkdownConfirm 
                title={title} 
                description={description} 
                mrkdown={replaceEmptyLinesWithBr(mrkdown)}
                tags={tags}
                isPublic={isPublic}
                thumbnailURL={thumbnailURL} 
                onChangeField={onChangeField}
                onClickPublishBtn={onClickPublishBtn}
                onClickImgBtn={onClickImgBtn}
                handleThumbnailReUpload={handleThumbnailReUpload}
                handleThumbnailDelete={handleThumbnailDelete}
            />
}

export default MarkdownConfirmForm;