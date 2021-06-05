import { useQuery } from '@apollo/client';
import { SAMPLE } from './apolloQueries';

export const useSample = () => useQuery(SAMPLE);
