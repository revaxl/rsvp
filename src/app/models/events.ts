export class Event {
    constructor(public name: string,
                public description: string,
                public userId: string,
                public date: number,
                public id?: string) {}
}
