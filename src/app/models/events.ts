export class Event {
    id?: string;
    name: string;
    creator: string;
    date: number;
    participants: [string];
    comments: {
        author: string,
        content: string,
        date: number
    };
    location: string;
    rating: number;
}
