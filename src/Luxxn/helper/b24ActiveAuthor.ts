export interface ModelLastUpdate {
    date?: string;
    timezone_type?: number;
    timezone?: string;
}

export interface ModelMostActiveAuthor {
    authors_id?: string;
    author?: string;
    author_url?: string;
    count?: number;
    followers_count?: string;
    influence_score?: number;
    estimated_social_reach?: number;
    socialmedia_sites_id?: number;
    host_top?: string;
    searches_id?: number;
    author_avatar_url?: string;
    author_real_name?: any;
    author_is_a_fanpage?: boolean;
    last_update?: ModelLastUpdate;
    author_followers_count?: number;
    author_external_id?: string;
    mongo_enriched_mention?: boolean;
    author_url_oryginal?: string;
    service?: string;
}

export interface ModelB24ActiveAuthor {
    most_active_authors?: ModelMostActiveAuthor[];
}