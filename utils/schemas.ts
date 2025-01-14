
export interface Bins {
    color: string,
    set: string,
	id?: string
}

export interface UserSchema {
	first_name: string,
	last_name: string,
	id: string
}


export interface DailySummarySchema {
	total_pickup: number,
	current_fill_level: number,
	usage: number,
	fullness_100_count: number,
	date: string,
	bins: Bins
}