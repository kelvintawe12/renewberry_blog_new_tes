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

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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
  description:
  'Detailed toolkit for monetization, editing, and optimization.',
  icon: 'BookOpen'
}];


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
}];


export const POSTS: Post[] = [
{
  id: 'p1',
  title: 'The Dawn of a New Era for Creators: Introducing RenewBerry',
  slug: 'dawn-of-new-era-renewberry',
  excerpt:
  'Weeping may endure for a night, but joy comes in the morning. Discover how RenewBerry is changing the landscape of video social media.',
  content: `
      <p>Welcome to RenewBerry. We believe that every story shared has the power to become a beacon of hope, transformation, and empowerment. In a digital world often clouded by negativity, we are building a sanctuary for fresh perspectives.</p>
      <h2>Our Mission</h2>
      <p>Our mission is simple yet profound: to empower creators and viewers through visual storytelling that inspires fresh perspectives, hope, and personal transformation. We want every viewing experience to be a catalyst for positive change and new beginnings.</p>
      <blockquote>"Weeping may endure for a night, but joy comes in the morning." This isn't just a philosophy; it's the heartbeat of our platform.</blockquote>
      <p>Whether you are a Personalized Creator looking to monetize your unique voice or a Creator Channel bringing established content to a new audience, RenewBerry offers the tools, community, and support you need to thrive.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post1/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'brand-voice')!,
  author: AUTHORS.find((a) => a.username === 'abongwa')!,
  tags: ['Launch', 'Mission', 'Hope', 'Renewal'],
  publishedAt: '2026-02-13T10:00:00Z',
  readTime: '4 min read',
  isFeatured: true,
  isTrending: true
},
{
  id: 'p2',
  title: 'Mastering the Algorithm: A Guide for Personalized Creators',
  slug: 'mastering-algorithm-personalized-creators',
  excerpt:
  'Learn how to optimize your videos for maximum reach and engagement on the RenewBerry platform.',
  content: `
      <p>Understanding how content is discovered on RenewBerry is crucial for your growth. Unlike other platforms that prioritize sensationalism, our algorithm is tuned to amplify stories of hope, resilience, and genuine human connection.</p>
      <h2>Key Ranking Factors</h2>
      <ul>
        <li><strong>Emotional Resonance:</strong> Videos that evoke positive emotions and inspire viewers perform exceptionally well.</li>
        <li><strong>Watch Time:</strong> Engaging storytelling that keeps viewers watching until the end is heavily rewarded.</li>
        <li><strong>Community Interaction:</strong> Meaningful comments and shares signal to our system that your content is making an impact.</li>
      </ul>
      <p>Remember, authenticity is your greatest asset. Don't try to game the system; instead, focus on telling stories that matter to you and your audience.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post2/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'creator-handbook')!,
  author: AUTHORS.find((a) => a.username === 'marcusc')!,
  tags: ['Algorithm', 'Growth', 'Tips'],
  publishedAt: '2026-02-15T14:30:00Z',
  readTime: '6 min read',
  isFeatured: true
},
{
  id: 'p3',
  title: 'From Zero to Hero: How Maria Found Her Voice',
  slug: 'zero-to-hero-maria-voice',
  excerpt:
  'A heartwarming story of a creator who overcame adversity and built a thriving community on RenewBerry.',
  content: `
      <p>Maria started her RenewBerry journey with just a smartphone and a desire to share her daily struggles and triumphs. Today, she has a community of over 100,000 followers who tune in daily for her "Morning Joy" series.</p>
      <h2>The Turning Point</h2>
      <p>For months, Maria's videos barely reached a hundred views. But she persisted. She focused on the core value of RenewBerry: transformation. She started documenting her journey of learning to paint after a career-ending injury.</p>
      <p>Her vulnerability resonated. Viewers weren't just watching a painting tutorial; they were watching a human being rebuild their life. This is the power of authentic storytelling on RenewBerry.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post3/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'discover')!,
  author: AUTHORS.find((a) => a.username === 'sarahj')!,
  tags: ['Success Story', 'Inspiration', 'Community'],
  publishedAt: '2026-02-18T09:15:00Z',
  readTime: '5 min read',
  isFeatured: true,
  isTrending: true
},
{
  id: 'p4',
  title: 'RenewBerry v1.2 Release Notes: Enhanced Analytics',
  slug: 'renewberry-v1-2-release-notes',
  excerpt:
  'We are rolling out new analytics tools to help you understand your audience better than ever before.',
  content: `
      <p>We are thrilled to announce the rollout of RenewBerry v1.2, featuring a completely overhauled analytics dashboard for our creators.</p>
      <h2>What's New?</h2>
      <p>The new dashboard provides deeper insights into viewer retention, demographic breakdowns, and engagement metrics. You can now see exactly when viewers drop off in your videos, allowing you to refine your pacing and storytelling.</p>
      <p>We've also introduced a "Hope Impact Score," a unique metric that gauges the positive sentiment and inspirational value of your content based on community feedback.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post4/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'kelvin')!,
  tags: ['Update', 'Features', 'Analytics'],
  publishedAt: '2026-02-20T11:00:00Z',
  readTime: '3 min read'
},
{
  id: 'p5',
  title: "Building the Frontend: A Developer's Perspective",
  slug: 'building-frontend-developer-perspective',
  excerpt:
  'A behind-the-scenes look at the technical decisions that power the smooth, responsive RenewBerry experience.',
  content: `
      <p>Creating a seamless video platform requires a robust and performant frontend architecture. At RenewBerry, we've prioritized speed, accessibility, and a delightful user experience.</p>
      <h2>Our Tech Stack</h2>
      <p>We rely heavily on React for our UI components, ensuring a reactive and dynamic interface. Tailwind CSS allows us to rapidly style our application while maintaining a consistent design system that reflects our brand's clean, newsroom aesthetic.</p>
      <p>Performance is always top of mind. We implement lazy loading for images and components, and carefully manage state to prevent unnecessary re-renders. Every millisecond counts when delivering high-quality video content.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post5/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'brand-voice')!,
  author: AUTHORS.find((a) => a.username === 'praise')!,
  tags: ['Engineering', 'Frontend', 'React'],
  publishedAt: '2026-02-22T16:45:00Z',
  readTime: '7 min read'
},
{
  id: 'p6',
  title: 'The Rise of "Slow Living" Content',
  slug: 'rise-of-slow-living-content',
  excerpt:
  'Analyzing the cultural shift towards mindful, intentional video content and why it thrives on RenewBerry.',
  content: `
      <p>In a fast-paced digital world, a counter-movement is gaining massive traction on RenewBerry: Slow Living content. These videos, characterized by calm pacing, natural sounds, and a focus on everyday tasks, are providing viewers with a much-needed digital sanctuary.</p>
      <h2>Why It Works Here</h2>
      <p>RenewBerry's ethos of hope and renewal aligns perfectly with the slow living philosophy. Viewers come to our platform not for frantic entertainment, but for a moment of peace and reflection. Creators who embrace this aesthetic are seeing incredible engagement and deep community connection.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post6/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'culture-trends')!,
  author: AUTHORS.find((a) => a.username === 'sarahj')!,
  tags: ['Trends', 'Culture', 'Mindfulness'],
  publishedAt: '2026-02-25T08:30:00Z',
  readTime: '4 min read',
  isTrending: true
},
{
  id: 'p7',
  title: 'Your First 30 Days on RenewBerry',
  slug: 'first-30-days-renewberry',
  excerpt:
  'A step-by-step onboarding guide to set your channel up for long-term success.',
  content: `
      <p>Welcome to the community! Your first month on RenewBerry is crucial for establishing your voice and finding your initial audience. Here is a roadmap to guide you.</p>
      <h2>Week 1: Profile and First Upload</h2>
      <p>Focus on completing your profile. A clear avatar, a compelling bio, and links to your other socials are essential. For your first video, introduce yourself and share your "why"—why are you creating content, and what hope do you want to share?</p>
      <h2>Week 2-4: Consistency and Engagement</h2>
      <p>Aim for a consistent upload schedule, even if it's just once a week. Spend equal time engaging with other creators' content. Leave thoughtful comments, share videos that inspire you, and start building relationships.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post7/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'onboarding')!,
  author: AUTHORS.find((a) => a.username === 'marcusc')!,
  tags: ['Guide', 'Beginner', 'Growth'],
  publishedAt: '2026-02-28T13:00:00Z',
  readTime: '8 min read'
},
{
  id: 'p8',
  title: 'Finding Joy in the Morning: A Community Essay',
  slug: 'finding-joy-in-morning-essay',
  excerpt:
  'A powerful reflection from a community member on overcoming grief through creative expression.',
  content: `
      <p>When I lost my job last year, the nights felt endlessly long. I started recording short video diaries on RenewBerry, not expecting anyone to watch. I just needed an outlet.</p>
      <p>To my surprise, people listened. They shared their own stories of loss and resilience in the comments. Through this shared vulnerability, I found a new sense of purpose. The act of creating became my therapy, and the community became my support system. Truly, joy comes in the morning, often in unexpected ways.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post8/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'heart-beat')!,
  author: AUTHORS.find((a) => a.username === 'sarahj')!,
  tags: ['Essay', 'Community', 'Healing'],
  publishedAt: '2026-03-02T10:15:00Z',
  readTime: '3 min read'
},
{
  id: 'p9',
  title: 'Monetization 101: Earning with Purpose',
  slug: 'monetization-101-earning-purpose',
  excerpt:
  'How Personalized Creators can build sustainable revenue streams while staying true to their message.',
  content: `
      <p>At RenewBerry, we believe creators should be rewarded for the positive impact they make. Our monetization tools are designed to align your financial success with your community's well-being.</p>
      <h2>Revenue Streams</h2>
      <p>Beyond standard ad revenue, we offer direct community support features like "Inspiration Tips" and exclusive content subscriptions. We encourage creators to view monetization not as a compromise of their values, but as a way to sustain and amplify their message of hope.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post9/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'creator-handbook')!,
  author: AUTHORS.find((a) => a.username === 'abongwa')!,
  tags: ['Monetization', 'Business', 'Creators'],
  publishedAt: '2026-03-05T15:20:00Z',
  readTime: '6 min read'
},
{
  id: 'p10',
  title: 'The Architecture of Hope: Designing the RenewBerry API',
  slug: 'architecture-of-hope-api',
  excerpt:
  'Deep dive into how we built a scalable, secure API to support millions of inspiring interactions.',
  content: `
      <p>Behind every seamless video playback and instant comment notification is a robust API infrastructure. In this post, we explore the architectural decisions that allow RenewBerry to scale gracefully.</p>
      <p>We utilize a microservices architecture, allowing our teams to iterate quickly on specific features like video transcoding and real-time analytics without disrupting the core platform. Security and data privacy are paramount, ensuring our community remains a safe space for expression.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post10/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'brand-voice')!,
  author: AUTHORS.find((a) => a.username === 'kelvin')!,
  tags: ['Engineering', 'Backend', 'API'],
  publishedAt: '2026-03-08T09:00:00Z',
  readTime: '8 min read'
},
{
  id: 'p11',
  title: 'How to Build a Loyal Community on RenewBerry',
  slug: 'how-to-build-loyal-community',
  excerpt:
  'Actionable strategies for fostering deep connections and turning casual viewers into dedicated advocates.',
  content: `
      <p>Building a community is more than just accumulating followers; it's about creating a shared space of belonging. On RenewBerry, where hope is the currency, authenticity is your strongest tool.</p>
      <h2>Engage Meaningfully</h2>
      <p>Don't just broadcast; converse. Reply to comments with genuine interest. Ask questions at the end of your videos to spark discussion. When viewers feel heard, they return.</p>
      <h2>Consistency is Key</h2>
      <p>Show up for your audience. Whether it's a weekly deep-dive or daily short updates, establish a rhythm so your community knows when to expect your light in their feed.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post11/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'creator-handbook')!,
  author: AUTHORS.find((a) => a.username === 'sarahj')!,
  tags: ['Community', 'Growth', 'Engagement'],
  publishedAt: '2026-03-10T10:00:00Z',
  readTime: '5 min read',
  isTrending: true
},
{
  id: 'p12',
  title: 'RenewBerry Creator Awards 2026: Nominations Open',
  slug: 'creator-awards-2026-nominations',
  excerpt:
  'It is time to celebrate the voices that have inspired us the most this year. Submit your nominations today!',
  content: `
      <p>We are thrilled to announce the first annual RenewBerry Creator Awards! This is our moment to shine a spotlight on the creators who embody our core values of hope, renewal, and transformation.</p>
      <h2>Categories</h2>
      <p>We are accepting nominations across several categories, including "Most Inspiring Story," "Community Builder of the Year," and "Breakout Voice."</p>
      <p>Head over to the awards portal to cast your vote. Let's celebrate the joy that comes in the morning!</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post12/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'abongwa')!,
  tags: ['Awards', 'Events', 'Community'],
  publishedAt: '2026-03-12T09:00:00Z',
  readTime: '3 min read',
  isFeatured: false
},
{
  id: 'p13',
  title: 'The Psychology of Hope in Digital Media',
  slug: 'psychology-of-hope-digital-media',
  excerpt:
  'Exploring the science behind why positive, uplifting content is essential for our mental well-being.',
  content: `
      <p>In an era of doom-scrolling, consuming positive media isn't just a preference; it's a psychological necessity. Research shows that exposure to hopeful narratives can significantly reduce anxiety and increase resilience.</p>
      <h2>The Ripple Effect</h2>
      <p>When we watch someone overcome adversity, our brains mirror that experience. This "vicarious resilience" empowers us to tackle our own challenges. RenewBerry is built on this very principle: that hope is contagious.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post13/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'culture-trends')!,
  author: AUTHORS.find((a) => a.username === 'marcusc')!,
  tags: ['Psychology', 'Wellness', 'Media'],
  publishedAt: '2026-03-15T14:00:00Z',
  readTime: '6 min read'
},
{
  id: 'p14',
  title: 'Setting Up Your First Live Stream',
  slug: 'setting-up-first-live-stream',
  excerpt:
  'A comprehensive guide to going live on RenewBerry, from technical setup to engaging your audience in real-time.',
  content: `
      <p>Live streaming is a powerful way to connect with your community intimately. It allows for real-time interaction and raw, unedited authenticity.</p>
      <h2>Technical Basics</h2>
      <p>You don't need a studio to start. A good smartphone camera, stable internet, and clear audio (a simple lapel mic works wonders) are all you need. Focus on lighting your face well so your expressions are clear.</p>
      <h2>Engaging the Chat</h2>
      <p>Acknowledge viewers by name as they join. Have a loose outline of topics, but let the chat guide the conversation. Remember, it's a dialogue, not a monologue.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post14/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'onboarding')!,
  author: AUTHORS.find((a) => a.username === 'praise')!,
  tags: ['Live', 'Tutorial', 'Video'],
  publishedAt: '2026-03-18T11:30:00Z',
  readTime: '7 min read'
},
{
  id: 'p15',
  title: 'Behind the Scenes: How We Design for Accessibility',
  slug: 'designing-for-accessibility',
  excerpt:
  'Our commitment to ensuring RenewBerry is usable and welcoming for everyone, regardless of ability.',
  content: `
      <p>Hope should be accessible to all. At RenewBerry, inclusive design isn't an afterthought; it's baked into our development process from day one.</p>
      <h2>Our Approach</h2>
      <p>We adhere strictly to WCAG guidelines. This means high-contrast color palettes, full keyboard navigability, and robust screen reader support. We also mandate auto-captions for all videos uploaded to the platform.</p>
      <p>Accessibility is an ongoing journey, and we are constantly listening to user feedback to improve the experience for our entire community.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post15/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'brand-voice')!,
  author: AUTHORS.find((a) => a.username === 'kelvin')!,
  tags: ['Design', 'Accessibility', 'Engineering'],
  publishedAt: '2026-03-20T16:00:00Z',
  readTime: '5 min read'
},
{
  id: 'p16',
  title: 'RenewBerry Creator Summit 2026: Join Us in Nairobi',
  slug: 'creator-summit-2026-nairobi',
  excerpt:
  'Our biggest event yet brings together 500+ creators from across Africa and beyond for three days of workshops, networking, and inspiration.',
  content: `
      <p>We are beyond excited to announce the RenewBerry Creator Summit 2026, taking place in Nairobi, Kenya from June 15-17. This is our largest gathering of creators, and it promises to be an unforgettable experience.</p>
      <h2>What to Expect</h2>
      <p>The summit features keynote speakers from the world's top content platforms, hands-on workshops covering everything from video editing to monetization strategies, and plenty of networking opportunities with fellow creators.</p>
      <h2>How to Attend</h2>
      <p>Early bird tickets are available now at a 40% discount. We also have a limited number of fully sponsored spots for emerging creators from underrepresented communities. Apply through the Creator Fund portal.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post16/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'abongwa')!,
  tags: ['Summit', 'Events', 'Nairobi', 'Networking'],
  publishedAt: '2026-03-22T09:00:00Z',
  readTime: '4 min read',
  isFeatured: true
},
{
  id: 'p17',
  title: 'Community Meetup Recap: Lagos Creator Night',
  slug: 'community-meetup-lagos-recap',
  excerpt:
  'Over 200 creators gathered in Lagos for an evening of storytelling, live performances, and community building.',
  content: `
      <p>Last Saturday, the RenewBerry community came alive in Lagos, Nigeria for our first-ever Creator Night. The energy was electric as over 200 creators, viewers, and supporters filled the venue.</p>
      <h2>Highlights</h2>
      <p>The evening featured live storytelling sessions where creators shared their journeys, a panel discussion on the future of African digital content, and an open mic segment that had the entire room on their feet.</p>
      <p>We also unveiled our new Creator Collaboration feature, which allows creators to co-produce content directly within the platform. The response was overwhelmingly positive.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post17/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'sarahj')!,
  tags: ['Meetup', 'Lagos', 'Community', 'Recap'],
  publishedAt: '2026-03-25T11:30:00Z',
  readTime: '5 min read',
  isTrending: true
},
{
  id: 'p18',
  title: 'Weekly Creator Webinar Series: Learn, Grow, Connect',
  slug: 'weekly-creator-webinar-series',
  excerpt:
  'Introducing free weekly webinars covering video production, storytelling techniques, audience growth, and monetization strategies.',
  content: `
      <p>We are launching a brand-new Weekly Creator Webinar Series, completely free for all RenewBerry creators. Every Thursday at 3 PM GMT, join industry experts and successful creators for an hour of learning and Q&A.</p>
      <h2>Upcoming Topics</h2>
      <ul>
        <li><strong>Week 1:</strong> Mastering Short-Form Storytelling</li>
        <li><strong>Week 2:</strong> Lighting on a Budget</li>
        <li><strong>Week 3:</strong> Building Your First 1,000 Followers</li>
        <li><strong>Week 4:</strong> Monetization Deep Dive</li>
      </ul>
      <p>All sessions are recorded and available in the Creator Handbook section for those who can't attend live. Register now to secure your spot!</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post18/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'marcusc')!,
  tags: ['Webinar', 'Education', 'Free', 'Weekly'],
  publishedAt: '2026-03-28T14:00:00Z',
  readTime: '3 min read'
},
{
  id: 'p19',
  title: 'RenewBerry Hackathon: Build for Hope',
  slug: 'renewberry-hackathon-build-for-hope',
  excerpt:
  'Calling all developers and designers! Join our 48-hour hackathon to build tools that amplify hopeful storytelling.',
  content: `
      <p>We are thrilled to announce "Build for Hope," RenewBerry's first-ever hackathon. Over 48 hours, teams of developers, designers, and creators will collaborate to build innovative tools and features that enhance our platform's mission.</p>
      <h2>Challenge Tracks</h2>
      <p>Participants can choose from three tracks: Accessibility Innovation, Creator Tools, and Community Safety. Each track has a $10,000 prize pool, and winning projects may be integrated into the RenewBerry platform.</p>
      <p>Whether you're a seasoned developer or a first-time hacker, there's a place for you. Registration opens April 1st.</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post19/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'kelvin')!,
  tags: ['Hackathon', 'Developers', 'Innovation', 'Prize'],
  publishedAt: '2026-04-01T10:00:00Z',
  readTime: '4 min read'
},
{
  id: 'p20',
  title: 'Global Day of Hope: March 20th Celebrations Worldwide',
  slug: 'global-day-of-hope-celebrations',
  excerpt:
  'Creators from 45 countries participated in our inaugural Global Day of Hope, sharing stories that moved millions.',
  content: `
      <p>On March 20th, the RenewBerry community came together for our inaugural Global Day of Hope. The results exceeded every expectation: over 10,000 videos were uploaded in a single day, reaching a combined audience of 15 million viewers.</p>
      <h2>The Impact</h2>
      <p>From sunrise videos in Tokyo to community gatherings in São Paulo, creators around the world shared their unique perspectives on hope. The most-viewed video, a collaborative piece featuring 50 creators from 30 countries, has already surpassed 2 million views.</p>
      <p>We are making this an annual tradition. Mark your calendars for next year, and start planning your contribution to the Global Day of Hope 2027!</p>
    `,
  featuredImage: 'https://picsum.photos/seed/post20/1200/600',
  category: CATEGORIES.find((c) => c.slug === 'news-events')!,
  author: AUTHORS.find((a) => a.username === 'abongwa')!,
  tags: ['Global', 'Hope', 'Community', 'Annual'],
  publishedAt: '2026-04-05T08:00:00Z',
  readTime: '5 min read',
  isFeatured: true,
  isTrending: true
}];


export const GALLERY_IMAGES: GalleryImage[] = [
{
  id: 'g1',
  slug: 'morning-dew-forest',
  title: 'Morning Dew in the Forest',
  description:
  'A serene morning walk through the ancient pines, capturing the first light of day.',
  imageUrl: 'https://picsum.photos/seed/gallery1/800/1000',
  category: 'Nature',
  photographer: 'Elena Rodriguez',
  date: 'March 1, 2026',
  tags: ['Forest', 'Morning', 'Peaceful', 'Light']
},
{
  id: 'g2',
  slug: 'urban-renewal',
  title: 'Urban Renewal',
  description:
  'A community garden blooming in the heart of the concrete jungle.',
  imageUrl: 'https://picsum.photos/seed/gallery2/800/600',
  category: 'Architecture',
  photographer: 'Marcus Chen',
  date: 'March 5, 2026',
  tags: ['City', 'Garden', 'Community', 'Green']
},
{
  id: 'g3',
  slug: 'joyful-gathering',
  title: 'Joyful Gathering',
  description: 'Friends sharing a moment of pure laughter and connection.',
  imageUrl: 'https://picsum.photos/seed/gallery3/800/800',
  category: 'People',
  photographer: 'Sarah Jenkins',
  date: 'March 8, 2026',
  tags: ['Friends', 'Laughter', 'Connection', 'Joy']
},
{
  id: 'g4',
  slug: 'abstract-hope',
  title: 'Abstract Hope',
  description:
  'A play of light and shadow representing the emergence of hope.',
  imageUrl: 'https://picsum.photos/seed/gallery4/800/1200',
  category: 'Abstract',
  photographer: 'David Kim',
  date: 'March 10, 2026',
  tags: ['Light', 'Shadow', 'Art', 'Conceptual']
},
{
  id: 'g5',
  slug: 'mountain-summit',
  title: 'Mountain Summit',
  description: 'Reaching the peak after a long and arduous climb.',
  imageUrl: 'https://picsum.photos/seed/gallery5/1000/800',
  category: 'Nature',
  photographer: 'Elena Rodriguez',
  date: 'March 12, 2026',
  tags: ['Mountain', 'Achievement', 'Landscape', 'Climb']
},
{
  id: 'g6',
  slug: 'creative-spark',
  title: 'The Creative Spark',
  description: 'An artist lost in the flow of creation in their studio.',
  imageUrl: 'https://picsum.photos/seed/gallery6/800/900',
  category: 'People',
  photographer: 'Marcus Chen',
  date: 'March 15, 2026',
  tags: ['Art', 'Studio', 'Creation', 'Focus']
},
{
  id: 'g7',
  slug: 'city-lights',
  title: 'City Lights at Dusk',
  description:
  'The city comes alive as the sun sets, painting the sky in vibrant colors.',
  imageUrl: 'https://picsum.photos/seed/gallery7/1200/800',
  category: 'Architecture',
  photographer: 'David Kim',
  date: 'March 18, 2026',
  tags: ['Cityscape', 'Dusk', 'Lights', 'Urban']
},
{
  id: 'g8',
  slug: 'quiet-reflection',
  title: 'Quiet Reflection',
  description:
  'A peaceful moment by the lake, reflecting on the journey so far.',
  imageUrl: 'https://picsum.photos/seed/gallery8/800/1100',
  category: 'Nature',
  photographer: 'Sarah Jenkins',
  date: 'March 20, 2026',
  tags: ['Lake', 'Reflection', 'Peace', 'Water']
},
{
  id: 'g9',
  slug: 'community-mural',
  title: 'Community Mural',
  description:
  'Locals coming together to paint a vibrant mural celebrating diversity.',
  imageUrl: 'https://picsum.photos/seed/gallery9/900/700',
  category: 'Community',
  photographer: 'Elena Rodriguez',
  date: 'March 22, 2026',
  tags: ['Art', 'Community', 'Mural', 'Together']
},
{
  id: 'g10',
  slug: 'geometric-harmony',
  title: 'Geometric Harmony',
  description:
  'Exploring the intersection of shapes and colors in modern architecture.',
  imageUrl: 'https://picsum.photos/seed/gallery10/800/1000',
  category: 'Abstract',
  photographer: 'Marcus Chen',
  date: 'March 25, 2026',
  tags: ['Architecture', 'Shapes', 'Modern', 'Design']
},
{
  id: 'g11',
  slug: 'spring-blossoms',
  title: 'Spring Blossoms',
  description: 'The first signs of spring bringing color back to the world.',
  imageUrl: 'https://picsum.photos/seed/gallery11/1000/1000',
  category: 'Nature',
  photographer: 'Sarah Jenkins',
  date: 'March 28, 2026',
  tags: ['Spring', 'Flowers', 'Renewal', 'Bloom']
},
{
  id: 'g12',
  slug: 'street-musician',
  title: 'Soulful Melodies',
  description: 'A street musician sharing their passion with passersby.',
  imageUrl: 'https://picsum.photos/seed/gallery12/800/800',
  category: 'People',
  photographer: 'David Kim',
  date: 'March 30, 2026',
  tags: ['Music', 'Street', 'Passion', 'City']
},
{
  id: 'g13',
  slug: 'creator-summit-2026',
  title: 'Creator Summit 2026',
  description:
  'Hundreds of creators gathered for our annual summit, sharing ideas and building connections.',
  imageUrl: 'https://picsum.photos/seed/gallery13/1200/800',
  category: 'Events',
  photographer: 'RenewBerry Team',
  date: 'February 15, 2026',
  tags: ['Summit', 'Creators', 'Networking', 'Conference']
},
{
  id: 'g14',
  slug: 'workshop-session',
  title: 'Storytelling Workshop',
  description:
  'Participants learning the art of visual storytelling in our hands-on workshop.',
  imageUrl: 'https://picsum.photos/seed/gallery14/900/600',
  category: 'Events',
  photographer: 'Marcus Chen',
  date: 'February 20, 2026',
  tags: ['Workshop', 'Learning', 'Storytelling', 'Education']
},
{
  id: 'g15',
  slug: 'volunteer-day',
  title: 'Community Volunteer Day',
  description:
  'Our team and creators giving back to the local community through volunteer work.',
  imageUrl: 'https://picsum.photos/seed/gallery15/800/900',
  category: 'Community',
  photographer: 'Sarah Jenkins',
  date: 'February 25, 2026',
  tags: ['Volunteer', 'Community', 'Giving', 'Together']
},
{
  id: 'g16',
  slug: 'sunrise-meditation',
  title: 'Sunrise Meditation',
  description: 'Finding inner peace as the sun rises over the horizon.',
  imageUrl: 'https://picsum.photos/seed/gallery16/1000/700',
  category: 'Inspiration',
  photographer: 'Elena Rodriguez',
  date: 'March 1, 2026',
  tags: ['Meditation', 'Sunrise', 'Peace', 'Mindfulness']
},
{
  id: 'g17',
  slug: 'award-ceremony',
  title: 'Creator Awards Ceremony',
  description:
  'Celebrating the achievements of our most inspiring creators at the annual awards.',
  imageUrl: 'https://picsum.photos/seed/gallery17/1100/800',
  category: 'Events',
  photographer: 'David Kim',
  date: 'March 5, 2026',
  tags: ['Awards', 'Celebration', 'Achievement', 'Recognition']
},
{
  id: 'g18',
  slug: 'ocean-waves',
  title: 'Ocean Waves at Dawn',
  description: 'The rhythmic dance of waves as a new day begins.',
  imageUrl: 'https://picsum.photos/seed/gallery18/900/1200',
  category: 'Nature',
  photographer: 'Sarah Jenkins',
  date: 'March 8, 2026',
  tags: ['Ocean', 'Waves', 'Dawn', 'Serenity']
},
{
  id: 'g19',
  slug: 'mentorship-moment',
  title: 'Mentorship in Action',
  description:
  'An experienced creator guiding a newcomer through their first video project.',
  imageUrl: 'https://picsum.photos/seed/gallery19/800/600',
  category: 'Community',
  photographer: 'Marcus Chen',
  date: 'March 10, 2026',
  tags: ['Mentorship', 'Learning', 'Growth', 'Support']
},
{
  id: 'g20',
  slug: 'color-explosion',
  title: 'Color Explosion',
  description:
  'An abstract representation of creative energy and artistic expression.',
  imageUrl: 'https://picsum.photos/seed/gallery20/800/1000',
  category: 'Abstract',
  photographer: 'David Kim',
  date: 'March 12, 2026',
  tags: ['Color', 'Abstract', 'Energy', 'Art']
},
{
  id: 'g21',
  slug: 'team-celebration',
  title: 'Team Celebration',
  description: 'The RenewBerry team celebrating a major milestone together.',
  imageUrl: 'https://picsum.photos/seed/gallery21/1000/700',
  category: 'Community',
  photographer: 'Elena Rodriguez',
  date: 'March 14, 2026',
  tags: ['Team', 'Celebration', 'Milestone', 'Joy']
},
{
  id: 'g22',
  slug: 'golden-hour-portrait',
  title: 'Golden Hour Portrait',
  description: 'A creator captured in the warm glow of the setting sun.',
  imageUrl: 'https://picsum.photos/seed/gallery22/800/1100',
  category: 'People',
  photographer: 'Sarah Jenkins',
  date: 'March 16, 2026',
  tags: ['Portrait', 'Golden Hour', 'Creator', 'Light']
},
{
  id: 'g23',
  slug: 'hope-rising',
  title: 'Hope Rising',
  description: 'A symbolic image of hope emerging from darkness into light.',
  imageUrl: 'https://picsum.photos/seed/gallery23/900/900',
  category: 'Inspiration',
  photographer: 'David Kim',
  date: 'March 18, 2026',
  tags: ['Hope', 'Light', 'Inspiration', 'Symbolic']
},
{
  id: 'g24',
  slug: 'live-stream-setup',
  title: 'Behind the Stream',
  description:
  'A peek behind the scenes of a professional live streaming setup.',
  imageUrl: 'https://picsum.photos/seed/gallery24/1000/800',
  category: 'People',
  photographer: 'Marcus Chen',
  date: 'March 20, 2026',
  tags: ['Streaming', 'Setup', 'Behind Scenes', 'Tech']
}];


export const VIDEOS: VideoItem[] = [
{
  id: 'v1',
  title: 'Finding Peace in the Chaos',
  thumbnail: 'https://picsum.photos/seed/vid1/720/1280',
  creator: AUTHORS[0],
  views: '1.2M',
  likes: '125K',
  comments: '4.2K',
  duration: '0:45',
  description:
  'Sometimes you just need to step back and breathe. #mindfulness #peace #renewberry'
},
{
  id: 'v2',
  title: 'My Morning Routine for Positivity',
  thumbnail: 'https://picsum.photos/seed/vid2/720/1280',
  creator: AUTHORS[3],
  views: '850K',
  likes: '92K',
  comments: '1.5K',
  duration: '1:15',
  description:
  'Start your day right with these simple habits. Joy comes in the morning! ☀️ #morningroutine #positivity'
},
{
  id: 'v3',
  title: 'Behind the Scenes: Studio Setup',
  thumbnail: 'https://picsum.photos/seed/vid3/720/1280',
  creator: AUTHORS[4],
  views: '420K',
  likes: '45K',
  comments: '890',
  duration: '2:30',
  description:
  'A quick tour of where the magic happens. Lighting is everything! 💡 #creator #behindthescenes #setup'
},
{
  id: 'v4',
  title: 'Overcoming Creative Block',
  thumbnail: 'https://picsum.photos/seed/vid4/720/1280',
  creator: AUTHORS[2],
  views: '600K',
  likes: '78K',
  comments: '2.1K',
  duration: '1:00',
  description:
  'Feeling stuck? Here is what I do to get the ideas flowing again. 🎨 #creativity #inspiration #art'
},
{
  id: 'v5',
  title: 'A Story of Resilience',
  thumbnail: 'https://picsum.photos/seed/vid5/720/1280',
  creator: AUTHORS[1],
  views: '2.1M',
  likes: '350K',
  comments: '12K',
  duration: '3:00',
  description:
  'Never give up. Your breakthrough is just around the corner. 💪 #resilience #hope #nevergiveup'
},
{
  id: 'v6',
  title: 'Nature Walk: Forest Sounds',
  thumbnail: 'https://picsum.photos/seed/vid6/720/1280',
  creator: AUTHORS[3],
  views: '950K',
  likes: '110K',
  comments: '3.4K',
  duration: '0:55',
  description:
  'Take a moment to listen to the sounds of the forest. 🌲 #nature #asmr #relax'
},
{
  id: 'v7',
  title: 'Community Spotlight: The Garden Project',
  thumbnail: 'https://picsum.photos/seed/vid7/720/1280',
  creator: AUTHORS[0],
  views: '340K',
  likes: '32K',
  comments: '560',
  duration: '1:45',
  description:
  'Look at what we built together! Thank you to everyone who volunteered. 🌻 #community #garden #together'
},
{
  id: 'v8',
  title: 'Quick Tip: Better Lighting',
  thumbnail: 'https://picsum.photos/seed/vid8/720/1280',
  creator: AUTHORS[4],
  views: '520K',
  likes: '65K',
  comments: '1.2K',
  duration: '0:30',
  description:
  'Instantly improve your videos with this one lighting trick. 📸 #videotips #lighting #creator'
},
{
  id: 'v9',
  title: 'Urban Sketching Time-lapse',
  thumbnail: 'https://picsum.photos/seed/vid9/720/1280',
  creator: AUTHORS[2],
  views: '780K',
  likes: '88K',
  comments: '2.3K',
  duration: '1:20',
  description:
  'Capturing the energy of the city in ink and watercolor. 🏙️ #art #sketching #citylife'
},
{
  id: 'v10',
  title: 'Healthy 15-Minute Meals',
  thumbnail: 'https://picsum.photos/seed/vid10/720/1280',
  creator: AUTHORS[3],
  views: '1.5M',
  likes: '150K',
  comments: '5.1K',
  duration: '2:10',
  description:
  'Eating well does not have to take all day. Try this quick recipe! 🥗 #cooking #healthy #quickmeals'
},
{
  id: 'v11',
  title: 'Coding a Simple Animation',
  thumbnail: 'https://picsum.photos/seed/vid11/720/1280',
  creator: AUTHORS[1],
  views: '320K',
  likes: '41K',
  comments: '950',
  duration: '1:50',
  description:
  'Let us build a cool CSS animation from scratch. 💻 #coding #webdev #tutorial'
},
{
  id: 'v12',
  title: 'Morning Yoga Flow',
  thumbnail: 'https://picsum.photos/seed/vid12/720/1280',
  creator: AUTHORS[0],
  views: '1.1M',
  likes: '130K',
  comments: '3.8K',
  duration: '3:15',
  description:
  'Stretch out and start your day with intention. 🧘‍♀️ #yoga #wellness #morning'
},
{
  id: 'v13',
  title: 'Thrifting & Upcycling',
  thumbnail: 'https://picsum.photos/seed/vid13/720/1280',
  creator: AUTHORS[4],
  views: '640K',
  likes: '72K',
  comments: '1.8K',
  duration: '2:45',
  description:
  'Turning old clothes into new fashion statements. 👗 #fashion #upcycle #diy'
},
{
  id: 'v14',
  title: 'Sunset Photography Tips',
  thumbnail: 'https://picsum.photos/seed/vid14/720/1280',
  creator: AUTHORS[2],
  views: '890K',
  likes: '95K',
  comments: '2.6K',
  duration: '1:30',
  description:
  'How to capture the perfect golden hour shot. 🌅 #photography #tips #sunset'
},
{
  id: 'v15',
  title: 'My Gratitude Journal',
  thumbnail: 'https://picsum.photos/seed/vid15/720/1280',
  creator: AUTHORS[3],
  views: '450K',
  likes: '55K',
  comments: '1.4K',
  duration: '1:10',
  description:
  'Taking 5 minutes a day to reflect on the good things. 📓 #gratitude #mentalhealth #journaling'
},
{
  id: 'v16',
  title: 'Rescuing a Stray Dog',
  thumbnail: 'https://picsum.photos/seed/vid16/720/1280',
  creator: AUTHORS[0],
  views: '3.2M',
  likes: '450K',
  comments: '18K',
  duration: '3:30',
  description:
  'Meet Max, our newest family member. His transformation is incredible. 🐶 #rescue #dogsoftiktok #hope'
},
{
  id: 'v17',
  title: 'Building a Bookshelf',
  thumbnail: 'https://picsum.photos/seed/vid17/720/1280',
  creator: AUTHORS[1],
  views: '510K',
  likes: '62K',
  comments: '1.1K',
  duration: '2:20',
  description:
  'A weekend DIY project. Measure twice, cut once! 🔨 #woodworking #diy #home'
},
{
  id: 'v18',
  title: 'Learning to Play Guitar',
  thumbnail: 'https://picsum.photos/seed/vid18/720/1280',
  creator: AUTHORS[4],
  views: '280K',
  likes: '35K',
  comments: '820',
  duration: '1:40',
  description:
  'Day 30 of my guitar journey. It is getting easier! 🎸 #music #learning #progress'
},
{
  id: 'v19',
  title: 'Volunteering at the Food Bank',
  thumbnail: 'https://picsum.photos/seed/vid19/720/1280',
  creator: AUTHORS[0],
  views: '720K',
  likes: '85K',
  comments: '2.9K',
  duration: '1:55',
  description:
  'Giving back to the community. Join us next week! 🤝 #volunteer #community #giveback'
},
{
  id: 'v20',
  title: 'Minimalist Desk Setup',
  thumbnail: 'https://picsum.photos/seed/vid20/720/1280',
  creator: AUTHORS[2],
  views: '930K',
  likes: '105K',
  comments: '3.1K',
  duration: '1:05',
  description:
  'A clean workspace for a clear mind. 🖥️ #desksetup #minimalism #productivity'
},
{
  id: 'v21',
  title: 'Baking Sourdough Bread',
  thumbnail: 'https://picsum.photos/seed/vid21/720/1280',
  creator: AUTHORS[3],
  views: '1.8M',
  likes: '190K',
  comments: '6.2K',
  duration: '2:50',
  description:
  'The sound of that crust crackling is everything. 🍞 #baking #sourdough #food'
},
{
  id: 'v22',
  title: 'React State Management',
  thumbnail: 'https://picsum.photos/seed/vid22/720/1280',
  creator: AUTHORS[1],
  views: '410K',
  likes: '52K',
  comments: '1.3K',
  duration: '2:15',
  description:
  'Breaking down complex state in React. ⚛️ #reactjs #coding #developer'
},
{
  id: 'v23',
  title: 'Painting a Landscape',
  thumbnail: 'https://picsum.photos/seed/vid23/720/1280',
  creator: AUTHORS[4],
  views: '670K',
  likes: '76K',
  comments: '2.4K',
  duration: '1:45',
  description:
  'Finding peace in every brushstroke. 🎨 #art #painting #landscape'
},
{
  id: 'v24',
  title: 'A Message of Hope',
  thumbnail: 'https://picsum.photos/seed/vid24/720/1280',
  creator: AUTHORS[0],
  views: '2.5M',
  likes: '310K',
  comments: '15K',
  duration: '1:20',
  description:
  'If you are seeing this, keep going. You are stronger than you think. ✨ #motivation #hope #inspiration'
}];