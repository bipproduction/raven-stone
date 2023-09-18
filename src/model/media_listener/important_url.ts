export interface ModelB24MostImportantUrl {
    host?: string;
    host_traffic_visits?: number;
    blocked_content_kind_of_page?: number;
    influence_score?: number;
    influence_value?: string;
}

export interface ModelB24ImportantUrl {
    most_important_urls?: ModelB24MostImportantUrl[];
}
