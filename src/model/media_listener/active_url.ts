export interface ModelB24MostActiveUrl {
    host: string;
    count: number;
    blocked_content_kind_of_page: number;
}

export interface ModelB24ActiveUrl {
    most_active_urls: ModelB24MostActiveUrl[];
}