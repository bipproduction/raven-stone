export interface ModelB24MostInteractiveEntriesFromSocialMedia {
    id?: any;
    searches_id?: number;
    created_date?: string;
    host?: string;
    host_top?: string;
    url?: string;
    host_traffic_visits?: number;
    page_category?: number;
    title?: string;
    content?: string;
    likes_count?: number;
    shares_count?: number;
    comments_count?: number;
    kind?: number;
    sentiment?: number;
    estimated_country_code?: string;
    importance_subscores?: any;
    influence_score?: number;
    non_social_reach?: number;
    mentions_id?: any;
    results_id?: any;
    results_sentiment?: number;
    author_url_oryginal?: any;
    mention_thumb_url?: string;
    result_open_link?: string;
    influence_value?: string;
    created_date_oryg?: string;
    followers_count_clear?: any;
    estimated_social_reach?: string;
    groups_title?: any[];
    groups_id?: any[];
    groups_is_protected?: any[];
    author?: any;
    content_original?: string;
    importance_label?: number;
}

export interface ModelB24SosialMedia {
    time?: number;
    most_interactive_entries_from_social_media?: ModelB24MostInteractiveEntriesFromSocialMedia[];
    isFullList?: boolean;
    entriesLimitPerPage?: number;
}



