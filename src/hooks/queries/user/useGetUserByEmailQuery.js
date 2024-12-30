import { useQuery } from "@tanstack/react-query";
import * as userAPI from '../../../lib/api/userAPI';

export const useGetUserByEmailQuery = (email, enabled) => {
    const {
        isPending,
        data
    } = useQuery({
        queryKey: ["getUserByEmail", {email}],
        queryFn: () => userAPI.getUserByEmail({email}),
        select: (res) => ({
            status: res?.state
        }),
        retry: 0,
        enabled
    })

    return { isPending, data }
}