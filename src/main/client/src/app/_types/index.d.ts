export interface I_AxiosResponse<T> {
    message: string;
    answer: T;
}

export interface I_Article {
    Id: number;
    Title: string;
    Subtitle: string;
    Content: string;
    Updated: string;
}

export {}