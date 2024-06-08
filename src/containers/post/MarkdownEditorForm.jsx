import React, { useEffect, useState, useCallback, useRef } from 'react';
import MarkdownEditor from '../../components/post/MarkdownEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../modules/publish';
import { useUploadImageMutation } from '../../hooks/mutations/useUploadImageMutation';
import { useAddPostMutation } from '../../hooks/mutations/useAddPostMutation';import { useNavigate } from 'react-router-dom';
import { useImgUpload } from '../../hooks/useImgUpload';
import { toast } from 'react-toastify';

const MarkdownEditorForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { saveActive, submitActive, title, mrkdown, postId } = useSelector(({ publish }) => ({
        saveActive: publish.saveActive,
        submitActive: publish.submitActive,
        title: publish.title,
        mrkdown: publish.mrkdown,
        postId: publish.postId
    }));

    const [imgFile, imgUpload, setImgFile] = useImgUpload();
    const [linkBoxInfo, setLinkBoxInfo] = useState({
        top: 0,
        left: 0,
        isActive: false
    })
    const [linkTxt, setLinkTxt] = useState('');
    const [imgBlobUrl, setImgBlobUrl] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    
    const codemirrorRef = useRef(null)
    const codemirrorBlockRef = useRef(null)
    const postIdRef = useRef(postId)
    const titleRef = useRef(title)
    const contentRef = useRef(mrkdown)

    const { mutate: uploadImageMutate } = useUploadImageMutation();
    const { mutateAsync: addPostMutateAsync } = useAddPostMutation();

    const onChangeField = useCallback(payload => 
        dispatch(changeField(payload)), [dispatch]);

    const onClickAddLinkCancel = useCallback(() => {
        setLinkTxt("")
        setLinkBoxInfo(prevState => {
            return {
                ...prevState,
                isActive: false
            }
        })
    }, [setLinkBoxInfo])

    const uploadImage = useCallback(
        async (imgFile) => {
            if (!imgFile) return
            let id = postIdRef.current;
            if (!id) {
                const title = titleRef.current || '';
                const content = contentRef.current || '';

                await addPostMutateAsync(
                    {
                        date: new Date(),
                        title: title,
                        content: content,
                        isTemp: true
                    },
                    {
                        onSuccess: (res) => {
                            id = res.data.id
                            onChangeField({ key: 'postId', value: id });
                            navigate(`/post/publish?id=${id}`)
                        },
                        onError: () => {
                            toast.error("포스트 저장에 실패했습니다.")
                            return;
                        }
                    }
                )
            }
            if (!id) return

            const url = URL.createObjectURL(imgFile)
            setImgBlobUrl(url)

            uploadImageMutate(
                {
                    editorImg: imgFile
                },
                {
                    onSuccess: (res) => {
                        setImagePath(res?.data.imagePath)
                        setImgFile(null)
                    },
                    onError: () => {
                        toast.error("이미지 저장에 실패했습니다.")
                        setImgFile(null)
                        return;
                    }
                }
            )
        }, [uploadImageMutate]
    );

    const onToolbarItemClick = useCallback((mode) => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const cursor = view.state.selection.main.head;
        const curLineObj = view.state.doc.lineAt(cursor);
        const selectionObj = {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to
        }

        let line = ""
        if (view.state.doc.lines <= 32) {
            line = view.state.doc.text[curLineObj.number - 1];
        } else {
            line = view.state.doc.children[parseInt((curLineObj.number - 1) / 32)].text[(curLineObj.number - 1) % 32]
        }

        const controllers = {
            ...[1, 2, 3, 4]
                .map((number) => () => {
                    const characters = '#'.repeat(number);
                    const plain = line.replace(/#{1,6} /, '')
                    codemirror.view.dispatch(view.state.replaceSelection(`${characters} ${plain}`))
                    codemirror.view.focus();
                })
                .reduce((headingHandlers, handler, index) => {
                    return Object.assign(headingHandlers, {
                        [`heading${index + 1}`]: handler,
                    });
                }, {}),
            bold: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/\*\*(.*)\*\*/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/\*\*/g, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 4}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`**${selectedTxt}**`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 4}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('**텍스트**'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 2, head: selectionObj.to + 5}})
                }
                codemirror.view.focus();
            },
            italic: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/\*(.*)\*/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/\*/g, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 2}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`*${selectedTxt}*`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 2}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('*텍스트*'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 1, head: selectionObj.to + 4}})
                }
                codemirror.view.focus();
            },
            strike: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length > 0) {
                    if (/~~(.*)~~/.test(selectedTxt)) {
                        const filterdSelectedTxt = selectedTxt.replace(/^~~/, '').replace(/~~$/, '')
                        codemirror.view.dispatch(view.state.replaceSelection(filterdSelectedTxt))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to - 4}})    
                    } else{
                        codemirror.view.dispatch(view.state.replaceSelection(`~~${selectedTxt}~~`))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from, head: selectionObj.to + 4}})
                    }
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection('~~텍스트~~'))
                    codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 2, head: selectionObj.to + 5}})
                }
                codemirror.view.focus();
            },
            quote: () => {
                codemirror.view.dispatch({ selection: {anchor: curLineObj.from, head: curLineObj.to}})

                if (/^> /.test(line)) {
                    codemirror.view.dispatch(view.state.replaceSelection(line.replace(/^> /, '')))
                } else {
                    codemirror.view.dispatch(view.state.replaceSelection(`> ${line}`))
                }
                codemirror.view.focus();
            },
            code: () => {
                const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
                if (selectedTxt.length === 0) {
                    if (cursor !== 0) {
                        codemirror.view.dispatch(view.state.replaceSelection('\n```\n코드를 입력하세요\n```'))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 5, head: selectionObj.to + 14}})
                    } else {
                        codemirror.view.dispatch(view.state.replaceSelection('```\n코드를 입력하세요\n```'))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 4, head: selectionObj.to + 13}})
                    }
                } else {
                    if (selectionObj.from !== 0) {
                        codemirror.view.dispatch(view.state.replaceSelection(
                            `
\`\`\`
${selectedTxt}
\`\`\``))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 5, head: selectionObj.to + 5}})
                    } else {
                        codemirror.view.dispatch(view.state.replaceSelection(
                            `\`\`\`
${selectedTxt}
\`\`\``))
                        codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 4, head: selectionObj.to + 4}})
                    }
                }
                codemirror.view.focus();
            },
            link: () => {
                const {top, left} = codemirror.view.coordsAtPos(cursor)
                const lineHeight = codemirror.view.defaultLineHeight;
                const scrollHeight = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                
                setLinkBoxInfo({
                    top: (top + lineHeight + scrollHeight - codemirrorBlockRef.current.offsetTop - 80) + '',
                    left: (left - codemirrorBlockRef.current.offsetLeft) + '',
                    isActive: true
                })
            },
            image: () => {
                imgUpload()
            }
        }
        const controller = controllers[mode];
        if (!controller) return;

        controller()
    }, [])

    const onClickAddLinkSubmit = useCallback((link) => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const selectionObj = {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to
        }

        const selectedTxt = view.state.sliceDoc(selectionObj.from, selectionObj.to)
        if (selectedTxt.length === 0) {
            codemirror.view.dispatch(view.state.replaceSelection(`[링크](${link})`))
            codemirror.view.dispatch({ selection: {anchor: selectionObj.from + 1, head: selectionObj.to + 3}})
        } else {
            codemirror.view.dispatch(view.state.replaceSelection(`[${selectedTxt}](${link})`))
        }
        onClickAddLinkCancel()
        codemirror.view.focus();
    }, [onClickAddLinkCancel])

    const appendImageBlobUrl = useCallback(imgBlobUrl => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;

        const view = codemirror.view.viewState;
        const cursor = view.state.selection.main.head;
        const curLoc = view.state.doc.lineAt(cursor);
        const selectionObj = {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to
        }

        if (curLoc.from - selectionObj.from) {
            codemirror.view.dispatch(view.state.replaceSelection(`\n![업로드중..](${imgBlobUrl})`))
        } else {
            codemirror.view.dispatch(view.state.replaceSelection(`![업로드중..](${imgBlobUrl})`))
        }    
        codemirror.view.focus();
    }, [])

    const appendImagePath = useCallback(imagePath => {
        const codemirror = codemirrorRef.current;
        if (!codemirror) return;
        
        const view = codemirror.view.viewState;
        const lines = view.state.doc.text
        const lineIdx = lines.findIndex(line => line.includes('![업로드중..]'))
        if (lineIdx === -1) return

        const targetLineObj = view.state.doc.line(lineIdx + 1)
        codemirror.view.dispatch({ changes: { from: targetLineObj.from, to: targetLineObj.to, insert: `![](${imagePath})\n` }})
        codemirror.view.focus();
    }, []) 

    useEffect(() => {
        if (!imgFile) return;
        uploadImage(imgFile)
        
    }, [imgFile, uploadImage])


    useEffect(() => {
        if (imgBlobUrl) {
            appendImageBlobUrl(imgBlobUrl)
        }
    }, [imgBlobUrl, appendImageBlobUrl])

    useEffect(() => {
        if (imagePath) {
            appendImagePath(imagePath)
        }
    }, [imagePath, appendImagePath])

    useEffect(() => {
        postIdRef.current = postId;
    }, [postId])

    useEffect(() => {
        contentRef.current = mrkdown
        titleRef.current = title
    }, [mrkdown, title])

    useEffect(() => {
        if (saveActive) {
            alert("hi")
            onChangeField({ key: 'saveActive', value: false})
        }
    }, [saveActive, onChangeField])

    useEffect(() => {
        if (submitActive) {
            onChangeField({ key: 'submitActive', value: false})
        }
    }, [submitActive, onChangeField])

    return <MarkdownEditor 
        onChangeField={onChangeField} 
        title={title}
        mrkdown={mrkdown}
        linkTxt={linkTxt}
        linkBoxInfo={linkBoxInfo}
        codemirrorRef={codemirrorRef}
        codemirrorBlockRef={codemirrorBlockRef}
        setLinkTxt={setLinkTxt}
        onToolbarItemClick={onToolbarItemClick}
        onClickAddLinkSubmit={onClickAddLinkSubmit}
        onClickAddLinkCancel={onClickAddLinkCancel}
    />
}

export default MarkdownEditorForm;