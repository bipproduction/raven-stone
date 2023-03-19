export interface ModelB24LastUpdate {
    date?: string;
    timezone_type?: number;
    timezone?: string;
}

export interface ModelB24MostImportantAuthor {
    authors_id?: string;
    author?: string;
    author_url?: string;
    count?: number;
    followers_count?: number;
    influence_score?: number;
    estimated_social_reach?: string;
    socialmedia_sites_id?: number;
    host_top?: string;
    searches_id?: number;
    author_avatar_url?: string;
    author_real_name?: any;
    author_is_a_fanpage?: boolean;
    last_update?: ModelB24LastUpdate;
    author_followers_count?: number;
    author_external_id?: string;
    mongo_enriched_mention?: boolean;
    author_url_oryginal?: string;
    service?: string;
    share_of_voice?: string;
    blocked_content_kind_of_page?: number;
}

export interface ModelImportantAuthor {
    most_important_authors?: ModelB24MostImportantAuthor[];
}