import { useQuery } from "@tanstack/react-query";
import * as tokenAPI from '../../../lib/api/tokenAPI';

export const useLogoutQuery = () => {
    const {
        refetch: logoutRefetch
    } = useQuery({
        queryKey: ["logout"],
        queryFn: tokenAPI.logout,
        enabled: false,
        retry: 0
    });

    return { logoutRefetch }
}