export class UserInput {
    private name: string
    private subject: string
    private origin: string

    constructor(name: string, subject: string, origin: string) {
        this.name = name
        this.subject = subject
        this.origin = origin
    }
    get getName() {
        return this.name
    }
    get getSubject() {
        return this.subject
    }
    get getOrigin() {
        return this.origin
    }
}

export class UserEntity extends UserInput {
    private Id: number
    private createdAt: Date

    constructor(id: number, username: string, subject: string, origin: string, createdAt: Date) {
        super(username, subject, origin)
        this.Id = id
        this.createdAt = createdAt
    }
}

export interface IUserEntity {
    Id: number
    name: string
    subject: string
    origin: string
    createdAt: Date
}