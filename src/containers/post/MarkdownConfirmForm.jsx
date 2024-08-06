import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/publish';
import { useAddPostMutation } from '../../hooks/mutations/useAddPostMutation';
import { useUpdatePostMutation } from '../../hooks/mutations/useUpdatePostMutation';
import MarkdownConfirm from '../../components/post/MarkdownConfirm';
import { useNavigate } from 'react-router-dom';
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { title, description, mrkdown, isPublic, postId } = useSelector(({ publish }) => ({
        title: publish.title,
        description: publish.description,
        mrkdown: publish.mrkdown,
        isPublic: publish.isPublic,
        postId: publish.postId
    }));

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
                        title: title,
                        description: description,
                        content: mrkdown,
                        isTemp: false,
                        isPublic: isPublic
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
                            // navigate(`/post/publish?id=${id}`, { replace: true })
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
                        title: title,
                        description: description,
                        content: mrkdown,
                        isTemp: false,
                        isPublic: isPublic
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
    
                        },
                        onError: () => {
                            toast.error("포스트 발행에 실패했습니다.")
                            return;
                        }
                    })
            }
        },
        [description, isPublic, mrkdown, title, postId, onChangeField, addPostMutateAsync, updatePostMutate])

    return <MarkdownConfirm 
                title={title} 
                description={description} 
                mrkdown={replaceEmptyLinesWithBr(mrkdown)}
                isPublic={isPublic} 
                onChangeField={onChangeField}
                onClickPublishBtn={onClickPublishBtn}
            />
}

export default MarkdownConfirmForm;