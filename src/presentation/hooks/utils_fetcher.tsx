import useSWR from 'swr';
import axios from 'axios';

export const dataFetcher = (url: string) => {
    const { data, error } = useSWR<any>(url, async (url:string) => {
        try {
          const response = await axios.get(url);
          return response;
        } catch (error) {
          console.log(error)
        }
      });
      const loading = !data && !error;

      console.log(loading)
}

