import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetBlogByIdQuery } from '../../hooks/queries/blog/useGetBlogByIdQuery';
import { useCreateBlogMutation } from '../../hooks/mutations/blog/useCreateBlogMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { changeUserField } from '../../modules/user';
import useDebounce from '../../hooks/useDebounce';
import BlogJoin from '../../components/blog/BlogJoin';
import { toast } from 'react-toastify';

const BlogJoinForm = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [blogId, setBlogId] = useState("")
    const [blogname, setBlogname] = useState("")
    const [idDone, setIdDone]= useState(false)
    const [submitActive, setSubmitActive] = useState(false)
    const [apiEnabled, setApiEnabled] = useState(false)
    const [isPending, debouncedValue] = useDebounce(blogId, 900)
    const [idObj, setIdObj] = useState({ isOkay: false, msg: "" })

    const { isPending: apiPending, data: blog } = useGetBlogByIdQuery(debouncedValue, apiEnabled);
    const { mutate: createBlogMutate } = useCreateBlogMutation();

    const handleBlogIdInput = useCallback((e) => {
        if (e.target.value?.length > 0 && e.target.value?.length <= 35) {
            setApiEnabled(true)
        } else {
            queryClient.removeQueries({ queryKey: ["getBlogById"], exact: false })
            setApiEnabled(false)
            setIdObj({
                isOkay: false,
                msg: ""
            })
        }

        if (e.target.value?.length <= 35) {
            setIdDone(false)
            setBlogId(e.target.value)
        }
    }, [queryClient])

    const onClickBlogIdCloseIcon = useCallback(() => {
        queryClient.removeQueries({ queryKey: ["getBlogById"], exact: false })
        setApiEnabled(false)
        setIdObj({
            isOkay: false,
            msg: ''
        })

        setBlogId("")
        setSubmitActive(false)
    }, [setBlogId, setIdObj, queryClient])

    const onClickSubmitBtn = useCallback(() => {
        createBlogMutate(
            {
                blogId: blogId,
                blogName: blogname
            },
            {
                onSuccess: (res) => {
                    const blogId = res.data.blogId;
                    changeUserField({ key: 'user', value: { ...user, hasBlog: true }})
                    navigate(`/blog/${blogId}`)
                },
                onError: () => {
                    toast.error("블로그 저장에 실패했습니다.")
                    return;
                }
            }
        )
    }, [blogname, blogId, user, createBlogMutate, navigate])

    useEffect(() => {
        if (Array.isArray(blog) && blog.length === 0) {
            setIdObj({
                isOkay: true,
                msg: "사용 가능한 아이디입니다!"
            })
            setIdDone(true)
        } else if (blog) {
            setIdObj({
                isOkay: false,
                msg: "이미 사용중인 아이디입니다."
            })
        }
    }, [blog])

    return <BlogJoin 
                user={user}
                blogId={blogId}
                blogname={blogname}
                blog={blog}
                idObj={idObj}
                idDone={idDone}
                isPending={isPending || (apiPending && apiEnabled)}
                submitActive={submitActive}
                setSubmitActive={setSubmitActive}
                setBlogname={setBlogname}
                setIdObj={setIdObj}
                handleBlogIdInput={handleBlogIdInput}
                onClickBlogIdCloseIcon={onClickBlogIdCloseIcon}
                onClickSubmitBtn={onClickSubmitBtn} 
            />
}

export default React.memo(BlogJoinForm);