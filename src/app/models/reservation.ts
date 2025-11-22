import { SiteArcheologique } from "./site-archeologique";

export interface Reservation {
    id: string;
    nom: string;
    email: string;
    tel: string;
    site: SiteArcheologique;
    date: string;
    personnes: number;
}
