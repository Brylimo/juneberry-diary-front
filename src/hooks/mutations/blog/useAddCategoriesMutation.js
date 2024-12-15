import { useMutation } from "@tanstack/react-query";
import * as blogAPI from '../../../lib/api/blogAPI';

export const useAddCategoriesMutation = () => {
    return useMutation({
        mutationFn: blogAPI.addCategories
    })
}