export interface Data {
  sections: ResourceBlock[];
}

interface ResourceBlock {
  title: string;
  description: string;
  items: Record<string, ResourceItem>; // e.g. { Channels: ..., 'Social Links': ... } - should correspond to a header in the docs
}

interface ResourceItem {
  slug: string; // Everything after https://www.guilded.gg/docs/api
  description: string; // Accepts markdown
  references?: Reference[]; // Messages (or any content) mentioning the issue or request, if applicable
  isComplete?: boolean; // The issue is no longer applicable
  completedAt?: string; // Approximate date or exact time (e.g. of an announcement) when the issue was resolved. Not required with isComplete
}

interface Reference {
  url: string; // URL to public content in Guilded
}
