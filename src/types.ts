export interface Worker {
    id: number;
    name: string;
    coordinatesId: number;
    organizationId: number | null;
    creationDate: string
    salary: number;
    rating: number | null;
    startDate: string;
    position: Position;
    status: Status;
    personId: number | null;
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
    locationId: number;
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
    z: number | null;
    name: string;
    creatorName: string;
}

export enum Position {
    DIRECTOR = 'DIRECTOR',
    LEAD_DEVELOPER = 'LEAD_DEVELOPER',
    BAKER = 'BAKER',
    CLEANER = 'CLEANER'
}

export enum Status {
    FIRED = 'FIRED',
    RECOMMENDED_FOR_PROMOTION = 'RECOMMENDED_FOR_PROMOTION',
    REGULAR = 'REGULAR',
    PROBATION = 'PROBATION'
}

export enum OrganizationType {
    COMMERCIAL = 'COMMERCIAL',
    PUBLIC = 'PUBLIC',
    PRIVATE_LIMITED_COMPANY = 'PRIVATE_LIMITED_COMPANY',
    OPEN_JOINT_STOCK_COMPANY = 'OPEN_JOINT_STOCK_COMPANY',
}

export enum Color {
    RED = 'RED',
    BLACK = 'BLACK',
    ORANGE = 'ORANGE',
    BROWN = 'BROWN'
}

export enum Country {
    GERMANY = 'GERMANY',
    FRANCE = 'FRANCE',
    CHINA = 'CHINA',
    INDIA = 'INDIA',
    JAPAN = 'JAPAN'
}

export enum PopupTypes {
    ERROR,
    SUCCESS,
    INFO,
    WARNING
}