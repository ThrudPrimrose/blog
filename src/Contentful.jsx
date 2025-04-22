import { createClient } from 'contentful';

export class ContentfulService {
  constructor() {
    console.assert(!ContentfulService._instance);
    console.assert(!this.cdaClient);
    ContentfulService._instance = this;
    this.cdaClient = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE,
      accessToken: import.meta.env.VITE_ACCESS_TOKEN,

    });
  }

  static _cdaClient = null;
  static _instance = null;

  static getInstance() {
    if (!ContentfulService._instance) {
      return new ContentfulService();
    }
    return ContentfulService._instance;
  }

  getAllEntriesOfType(entry_id) {
    console.assert(this.cdaClient);
    return this.cdaClient
      .getEntries(Object.assign({ content_type: entry_id }, {}))
      .then(res => res.items);
  }

  getAutobiography() {
    console.assert(this.cdaClient);
    return this.getAllEntriesOfType('pAutobiography', {});
  }

  getExperience() {
    console.assert(this.cdaClient);
    return this.getAllEntriesOfType('pExperienceList', {});
  }

  getEducation() {
    console.assert(this.cdaClient);
    return this.getAllEntriesOfType('pEducationList', {});
  }

  getBlogPosts() {
    console.assert(this.cdaClient);
    return this.getAllEntriesOfType('pBlogPost', {});
  }

  getLatestNBlogPosts() {
    console.assert(this.cdaClient);
    return this.cdaClient.getEntries(
      { content_type: 'pBlogPost', order: '-sys.createdAt', limit: 3 });
  }

  getFavoritePosts() {
    console.assert(this.cdaClient);
    return this.getAllEntriesOfType('favoritePosts', {});
  }
}