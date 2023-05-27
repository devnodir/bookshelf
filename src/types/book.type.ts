export interface IBook {
    author: string;
    cover: string;
    isbn: string;
    pages: number;
    published: number;
    title: string;
    id: number;
}

export interface IBookData {
    book: IBook;
    status: number;
}
