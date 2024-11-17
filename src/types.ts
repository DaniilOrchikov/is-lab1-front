export interface Worker {
    id: number;
    name: string;
    coordinatesId: number;
    organizationId: number;
    creationDate: string
    salary: number;
    rating: number;
    startDate: string;
    position: Position;
    status: Status;
    personId: number;
    creatorName: string;
}


export interface Coordinates {
    id: number
    x: number
    y: number
    creatorName: string;
}

export function compareCoordinates(coordA: Coordinates, coordB: Coordinates): number {
    return coordA.x ** 2 + coordA.y ** 2 - coordB.x ** 2 - coordB.y ** 2;
}

export interface Organization {
    id: number
    addressId: number;
    annualTurnover: number;
    employeesCount: number;
    fullName: string;
    rating: number;
    type: OrganizationType;
    creatorName: string;
}

export interface Person {
    id: number
    eyeColor: Color;
    hairColor: Color;
    // locationId: number;
    height: number;
    nationality: Country;
    creatorName: string;
}

export interface Address {
    id: number
    street: string;
    zipCode: string;
    creatorName: string;
}

export interface Location {
    id: number
    x: number;
    y: number;
    z: number;
    name: string;
    creatorName: string;
}

export enum Position {
    DIRECTOR = 'Director',
    LEAD_DEVELOPER = 'Lead Developer',
    BAKER = 'Baker',
    CLEANER = "Cleaner"
}

export enum Status {
    FIRED = 'Fired',
    RECOMMENDED_FOR_PROMOTION = 'Recommended for Promotion',
    REGULAR = 'Regular',
    PROBATION = 'Probation'
}

export enum OrganizationType {
    COMMERCIAL = 'Commercial',
    PUBLIC = 'Public',
    PRIVATE_LIMITED_COMPANY = 'Private Limited Company',
    OPEN_JOINT_STOCK_COMPANY = 'Open Joint Stock Company',
}

export enum Color {
    RED = "Red",
    BLACK = "Black",
    ORANGE = "Orange",
    BROWN = "Brown"
}

export enum Country {
    GERMANY = "Germany",
    FRANCE = "France",
    CHINA = "China",
    INDIA = "India",
    JAPAN = "Japan"
}

export enum PopupTypes {
    ERROR,
    SUCCESS,
    INFO,
    WARNING
}