import { Commentaire } from "./commentaire";
import { SiteDetail } from "./site-detail";

export interface SiteArcheologique {
    id: string;
    nom: string;
    localisation: string;
    gouvernorat: string;
    photo: string;
    prixEntree: number;
    descriptionCourte: string;
    descriptionDetaillee?: SiteDetail[];
    horaires: string;
    comments?: Commentaire[];
    //
    latitude: number;
    longitude: number;
    siteProtege: boolean;
    dateAjout: Date;
}
