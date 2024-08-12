import { useMutation } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useCreateBlogMutation = () => {
    return useMutation({
        mutationFn: blogAPI.createBlog
    })
}