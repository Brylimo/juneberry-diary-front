import { useQuery } from "@tanstack/react-query";
import * as authAPI from '../../lib/api/authAPI';

export const useLogoutQuery = () => {
    const {
        refetch: logoutRefetch
    } = useQuery({
        queryKey: ["logout"],
        queryFn: authAPI.logout,
        enabled: false,
        retry: 0
    });

    return { logoutRefetch }
}