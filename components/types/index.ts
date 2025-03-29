export * from "./user"

export type TPickUpTable = {
	id: string;
	bin_id: string;
	collected_by: string;
	pickup_at: Date
} 

export type TSetTable = {
	id: string;
	name: string;
	created_at: Date | string
}

