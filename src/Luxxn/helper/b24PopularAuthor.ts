export interface ModelB24Id {
    $id?: string;
}

export interface ModelB24ImportanceSubscores {
    author_importance?: number;
    sentiment_importance?: number;
}

export interface ModelB24LastUpdate {
    date?: string;
    timezone_type?: number;
    timezone?: string;
}

export interface ModelB24LangdetLanguageDetectionStatus {
}

export interface ModelB24EntriesFromMostPopularAuthor {
    _id?: ModelB24Id;
    id?: any;
    searches_id?: number;
    created_date?: string;
    created_days?: number;
    crawled_date?: string;
    host?: string;
    host_top?: string;
    url?: string;
    host_traffic_visits?: any;
    page_category?: number;
    title?: string;
    content?: string;
    author?: string;
    kind?: number;
    sentiment?: number;
    sentiment_score?: number;
    estimated_country_code?: string;
    importance_label?: number;
    importance_subscores?: ModelB24ImportanceSubscores;
    influence_score?: number;
    social_reach?: number;
    pc_previous?: number;
    authors_id?: string;
    followers_count?: string;
    socialmedia_sites_id?: number;
    author_url?: string;
    estimated_social_reach?: string;
    author_avatar_url?: string;
    author_real_name?: any;
    author_is_a_fanpage?: boolean;
    last_update?: ModelB24LastUpdate;
    author_followers_count?: number;
    author_external_id?: string;
    mongo_enriched_mention?: boolean;
    author_url_oryginal?: string;
    langdet_language_detection_status?: ModelB24LangdetLanguageDetectionStatus;
    mention_thumb_url?: string;
    result_open_link?: string;
    influence_value?: string;
    created_date_oryg?: string;
    followers_count_clear?: number;
}

export interface ModelB24PopularAuthor {
    time?: number;
    entries_from_most_popular_authors?: ModelB24EntriesFromMostPopularAuthor[];
    isFullList?: boolean;
    entriesLimitPerPage?: number;
}