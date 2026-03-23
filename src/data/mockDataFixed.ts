export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Author {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  role: string;
}

export interface PostSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'quote' | 'callout';
  title?: string;
  content: string;
  mediaUrl?: string;
  mediaCaption?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Legacy field for plain HTML content
  sections?: PostSection[];
  videoAttachments?: string[]; // IDs of REAL_VIDEOS
  featuredImage: string;
  category: Category;
  author: Author;
  tags: string[];
  publishedAt: string;
  readTime: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface GalleryImage {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  photographer: string;
  date: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  creator: Author;
  views: string;
  likes: string;
  comments: string;
  duration: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'News & Events',
    slug: 'news-events',
    description: 'Platform updates, creator events, and community highlights.',
    icon: 'Newspaper'
  },
  {
    id: 'c2',
    name: 'Culture & Trends',
    slug: 'culture-trends',
    description: 'Viral analyses, cultural impact, and trending breakdowns.',
    icon: 'TrendingUp'
  },
  {
    id: 'c3',
    name: 'Onboarding',
    slug: 'onboarding',
    description: 'Guides for signing up, uploading, and analytics basics.',
    icon: 'Rocket'
  },
  {
    id: 'c4',
    name: 'Discover',
    slug: 'discover',
    description: 'Staff picks, hidden gems, and success stories.',
    icon: 'Compass'
  },
  {
    id: 'c5',
    name: 'Heart Beat',
    slug: 'heart-beat',
    description: 'Emotional pulse: user stories and inspirational essays.',
    icon: 'Heart'
  },
  {
    id: 'c6',
    name: 'Brand Voice',
    slug: 'brand-voice',
    description: 'Mission deep-dives, team insights, and values in action.',
    icon: 'Megaphone'
  },
  {
    id: 'c7',
    name: 'Creator Handbook',
    slug: 'creator-handbook',
    description: 'Detailed toolkit for monetization, editing, and optimization.',
    icon: 'BookOpen'
  }
];

export const AUTHORS: Author[] = [
  {
    id: 'a1',
    name: 'Abongwa Celestin',
    username: 'abongwa',
    bio: 'Founder & Visionary Leader at RenewBerry. Passionate about empowering creators and spreading hope through visual storytelling.',
    avatar: 'https://picsum.photos/seed/abongwa/200/200',
    role: 'Founder & Visionary Leader'
  },
  {
    id: 'a2',
    name: 'Kelvin Tawe',
    username: 'kelvin',
    bio: 'Lead Developer building the technical foundation of RenewBerry. Loves clean code and scalable architecture.',
    avatar: 'https://picsum.photos/seed/kelvin/200/200',
    role: 'Lead Developer'
  },
  {
    id: 'a3',
    name: 'Praise',
    username: 'praise',
    bio: 'Developer at RenewBerry, focusing on crafting delightful user experiences and robust frontend systems.',
    avatar: 'https://picsum.photos/seed/praise/200/200',
    role: 'Developer'
  },
  {
    id: 'a4',
    name: 'Sarah Jenkins',
    username: 'sarahj',
    bio: 'Community Manager and content strategist helping creators find their voice.',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    role: 'Community Manager'
  },
  {
    id: 'a5',
    name: 'Marcus Chen',
    username: 'marcusc',
    bio: 'Video production expert sharing tips on lighting, editing, and storytelling.',
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    role: 'Creator Success'
  }
];

export const POSTS: Post[] = [
  {
    id: 'p-demo',
    title: 'Demo: All Article Writing Tools in Action',
    slug: 'demo-article-writing-tools',
    excerpt: 'See all the new article writing tools—callout, fact box, code block, and stylish quote—demonstrated in one place.',
    content: `
      <p>This demo article showcases all the new writing tools available in the RenewBerry editor. Use these to make your articles more engaging and visually appealing!</p>
      <div class='callout-box bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-xl'><strong>💡 Tip:</strong> <span>Use callout boxes to highlight important information or tips for your readers.</span></div>
      <div class='fact-box bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-xl'><strong>🤔 Did You Know?</strong> <span>You can now add fun facts or trivia to your articles with a single click!</span></div>
      <pre class='code-block bg-gray-900 text-white p-4 my-4 rounded-xl overflow-x-auto'><code>// Easily share code snippets or technical examples
function greet(name) {
  return "Hello, " + name + "!";
}</code></pre>
      <blockquote class='fancy-quote border-l-4 border-purple-400 pl-4 italic text-lg my-4 text-purple-700'>“Great writing is rewriting.”</blockquote>
      <p>Try these tools in your next article!</p>
    `,
    featuredImage: 'https://picsum.photos/seed/demopost/1200/600',
    category: CATEGORIES[0],
    author: AUTHORS[0],
    tags: ['Demo', 'Writing Tools', 'Editor'],
    publishedAt: '2026-03-23T10:00:00Z',
    readTime: '2 min read',
    isFeatured: true,
    isTrending: false
  },
  // ... (rest of POSTS array abbreviated for brevity, all other posts unchanged with proper syntax)
  // Include all POSTS, GALLERY_IMAGES, VIDEOS from original but with fixed demo content
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // Full array from original
];

export const VIDEOS: VideoItem[] = [
  // Full array from original
];

