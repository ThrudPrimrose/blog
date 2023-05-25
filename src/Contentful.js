import { createClient, Entry } from 'contentful';

export class ContentfulService {
    constructor(){
        console.assert(!ContentfulService._instance);
        console.assert(!this.cdaClient);
        ContentfulService._instance = this;
        this.cdaClient = createClient({
            space: process.env.REACT_APP_CONTENTFUL_SPACE,
            accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    
        });
    }

    static _cdaClient = null;
    static _instance = null;

    static getInstance() {
        if(!ContentfulService._instance){
            return new ContentfulService();
        }
        return ContentfulService._instance;
    }

    getAllEntriesOfType(entry_id, query) {
        console.assert(this.cdaClient);
        return this.cdaClient.getEntries(Object.assign({
          content_type: entry_id
        }, query)).then(res => res.items);
    }

    getAutobiography(query) {
        console.assert(this.cdaClient);
        return this.getAllEntriesOfType("pAutobiography", query);
    }
}

//ContentfulService._instance = null;
//export default ContentfulService;