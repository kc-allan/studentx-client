import { Offer } from "./offer";
import { Merchant } from "./user";

export interface Category {
	id: string;
	name: string;
	slug: string;
	imageURL: string;
	offers?: Offer[]
	merchants?: Merchant[];
}