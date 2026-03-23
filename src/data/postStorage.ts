import { Post } from './mockData';

const STORAGE_KEY = 'renewberry_posts';

export const postStorage = {
  getPosts(): Post[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  savePost(post: Post): Post {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index > -1) {
      posts[index] = post;
    } else {
      post.id = crypto.randomUUID();
      post.publishedAt = post.publishedAt || new Date().toISOString();
      post.slug = post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      posts.push(post);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return post;
  },

  getPost(id: string): Post | undefined {
    return this.getPosts().find(p => p.id === id);
  },

  deletePost(id: string): void {
    const posts = this.getPosts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
};
