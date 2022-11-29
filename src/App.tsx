import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Link } from './components/Link';
import { Markdown } from './components/Markdown';
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
          {data.sections.map((section) => {
            const flattened: Issue[] = [];
            const addIssues = (issues: Issue[]) => {
              for (const issue of issues) {
                flattened.push(issue);
                if (issue.issues) addIssues(issue.issues);
              }
            };

            for (const items of Object.values(section.items)) {
              for (const item of items) {
                addIssues(item.issues);
              }
            }

            return (
              <details
                key={section.title}
                id={section.title.toLowerCase().replace(/ /g, '-')}
                className='rounded-lg bg-guilded-slate py-4 px-6'
                open
              >
                <summary className='font-bold text-2xl cursor-pointer flex'>
                  <span>{section.title}</span>
                  <span className='text-guilded-gilded ml-auto'>
                    {flattened.filter((i) => i.isComplete).length}
                  </span>
                  <span className='dark:text-guilded-subtitle'>
                    /{flattened.length}
                  </span>
                </summary>
                <p className='text-guilded-subtitle'>
                  <Markdown>{section.description}</Markdown>
                </p>
                {Object.entries(section.items).map(([tag, items]) => (
                  <div key={tag} className='mt-2'>
                    {items.map((item) => {
                      const url = `https://www.guilded.gg/docs/api/${tag}/${item.operationId}`;
                      return (
                        <div
                          key={item.operationId}
                          id={item.operationId || item.operationSummary}
                          className='target:bg-guilded-gilded/[0.05] py-1 px-2 -mx-2 rounded'
                        >
                          <h1 className='font-bold text-lg flex group'>
                            <Link href={url}>{item.operationSummary}</Link>
                            <a
                              href={`#${
                                item.operationId || item.operationSummary
                              }`}
                              className='opacity-0 group-hover:opacity-80 transition text-sm my-auto ml-2'
                            >
                              &#x1f517;
                            </a>
                          </h1>
                          <hr className='mb-2 border-guilded-gray' />
                          <Issues issues={item.issues} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Issues: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  return (
    <ul>
      {issues.map((issue, index) => (
        <>
          <li key={`issue-${index}/${issues.length}`} className='flex'>
            <input
              type='checkbox'
              defaultChecked={issue.isComplete}
              className='mr-2 mb-auto mt-1'
              disabled
            />
            <Markdown>{issue.description}</Markdown>
            {issue.references && (
              <div className='ml-1'>
                {issue.references.map((reference, refIndex) => (
                  <sup
                    className='mt-3'
                    key={`reference-${reference.url}-${refIndex}`}
                  >
                    {refIndex > 0 && ', '}
                    <Link href={reference.url}>{refIndex + 1}</Link>
                  </sup>
                ))}
              </div>
            )}
          </li>
          {issue.issues && (
            <div className='ml-6'>
              <Issues issues={issue.issues} />
            </div>
          )}
        </>
      ))}
    </ul>
  );
};
