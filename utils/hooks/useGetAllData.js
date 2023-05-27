import { get } from '../../helpers/api_helper';
import { useQuery } from '@tanstack/react-query';

export const useGetAllData = (queryKey , url) => {
    const fetchData = (url) => {
        return get(url);
    }
    return useQuery({
        queryKey: [queryKey , url],
        queryFn: ()=> fetchData(url),
        keepPreviousData: true
    } );
}