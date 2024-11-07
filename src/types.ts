export interface Worker {
    id: number;
    name: string;
    coordinatesId: number;
    // organization: Organization;
    salary: number;
    rating: number;
    // startDate: Date;
    // position: Position;
    status: Status;
    // personId: number;
}


export interface Coordinates {
    id: number
    x: number
    y: number
}
export function compareCoordinates(coordA: Coordinates, coordB:Coordinates): number {
    return coordA.x ** 2 + coordA.y ** 2 - coordB.x ** 2 - coordB.y ** 2;
}
//
// export interface Organization {
//     address: Address;
//     annualTurnover: number;
//     employeesCount: number;
//     fullName: string;
//     rating: number;
//     type: OrganizationType;
// }
//
export interface Person {
    eyeColor: Color;
    hairColor: Color;
    location: Location;
    height: number;
    nationality: Country;
}
//
// export interface Address {
//     street: string;
//     zipCode: string;
// }
//
export interface Location {
    x: number;
    y: Number;
    z: number;
    name: string;
}
//
// export enum Position {
//     DIRECTOR,
//     LEAD_DEVELOPER,
//     BAKER,
//     CLEANER
// }
//
export enum Status {
    FIRED = 'Fired',
    RECOMMENDED_FOR_PROMOTION = 'Recommended for Promotion',
    REGULAR = 'Regular',
    PROBATION = 'Probation'
}
//
// export enum OrganizationType {
//     COMMERCIAL,
//     PUBLIC,
//     PRIVATE_LIMITED_COMPANY,
//     OPEN_JOINT_STOCK_COMPANY
// }
//
export enum Color {
    RED="Red",
    BLACK="Black",
    ORANGE="Orange",
    BROWN="Brown"
}
//
export enum Country {
    GERMANY="Germany",
    FRANCE="France",
    CHINA="China",
    INDIA="India",
    JAPAN="Japan"
}

export enum PopupTypes {
    ERROR,
    SUCCESS,
    INFO,
    WARNING
}