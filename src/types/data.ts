export interface Data {
  sections: ResourceBlock[];
}

interface ResourceBlock {
  title: string;
  description: string; // Accepts GitHub-flavored markdown
  items: Record<string, ResourceItem[]>; // e.g. { channels: ..., socialLinks: ... } - should correspond to a tag in the docs
}

interface ResourceItem {
  operationSummary: string; // The "title" of the operation, or the name of the socket event
  operationId: string; // Everything after https://www.guilded.gg/docs/api/{}
  issues: Issue[];
}

export interface Issue {
  description: string; // Accepts GitHub-flavored markdown
  references?: Reference[]; // Messages (or any content) mentioning the issue or request, if applicable
  isComplete?: boolean; // The issue is no longer applicable
  completedAt?: string; // Approximate date or exact time (e.g. of an announcement) when the issue was resolved. Not required with isComplete
  issues?: Issue[]; // Sub-issues, if applicable
}

interface Reference {
  url: string; // URL to public content in Guilded
}
