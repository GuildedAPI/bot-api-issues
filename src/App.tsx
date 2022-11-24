import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Link } from './components/Link';
import { Data, Issue } from './types/data';

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
      {isLoading || !data ? (
        'Loading...'
      ) : (
        <div className='space-y-2'>
          {data.sections.map((section) => (
            <details
              key={section.title}
              id={section.title.toLowerCase().replace(/ /g, '-')}
              className='rounded-lg bg-guilded-slate py-4 px-6'
              open
            >
              <summary className='font-bold text-lg cursor-pointer'>
                {section.title}
              </summary>
              <p className='text-guilded-subtitle'>{section.description}</p>
              {Object.entries(section.items).map(([tag, items]) => (
                <div key={tag} className='mt-2'>
                  {items.map((item) => {
                    const url = `https://www.guilded.gg/docs/api/${tag}/${item.operationId}`;
                    return (
                      <div key={item.operationId} id={item.operationId}>
                        <h1 className='font-bold text-2xl flex'>
                          <Link href={url}>{item.operationSummary}</Link>
                          <a href={`#${item.operationId}`} className='ml-2'>
                            Link
                          </a>
                        </h1>
                        <Issues issues={item.issues} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

const Issues: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <ul>
      {issues.map((issue, index) => (
        <li key={`issue-${index}/${issues.length}`}>
          <input
            type='checkbox'
            defaultChecked={issue.isComplete}
            className='mr-2'
            disabled
          />
          {issue.description}
        </li>
      ))}
    </ul>
  );
};
