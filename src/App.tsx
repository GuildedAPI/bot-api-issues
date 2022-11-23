import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Link } from './components/Link';
import { Data } from './types/data';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  );
}

const Index: React.FC = () => {
  const { isLoading, data } = useQuery<Data>(
    'data',
    async () => {
      return await (await fetch('/data.json')).json();
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className='mx-auto max-w-2xl'>
      <div className='mb-2'>
        <p>
          Below are a couple nitpicks I have about the current API and its docs.
          Some of these have already been mentioned in the API server by me and
          others but I figured this was a nice way to collect & present them.
        </p>
        <p className='space-x-2 text-sm font-bold'>
          <Link href='https://github.com/GuildedAPI/bot-api-issues#contributing'>
            Contribute to this site
          </Link>
          <span>•</span>
          <Link href='https://www.guilded.gg/docs/api/introduction'>
            Guilded API Docs
          </Link>
        </p>
      </div>
      {isLoading || !data ? 'Loading...' : <div></div>}
    </div>
  );
};
