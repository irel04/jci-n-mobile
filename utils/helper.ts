export function timeAgo(timestamp: string) {
	const now = new Date();
	const time = new Date(timestamp);
	const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minutes ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hours ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) {
		return `${diffInDays} days ago`;
	}

	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4) {
		return `${diffInWeeks} weeks ago`;
	}

	const diffInMonths = Math.floor(diffInDays / 30); // Approximate months
	if (diffInMonths < 12) {
		return `${diffInMonths} months ago`;
	}

	const diffInYears = Math.floor(diffInDays / 365); // Approximate years
	return `${diffInYears} years ago`;
}

export function startEndOfWeek(date: string){
	// Calculate the start and end of the week based on the provided date
		const startOfWeek = new Date(date);
		const endOfWeek = new Date(date);
	  
		// Set the start of the week to be Sunday (or adjust based on your needs)
		startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());  // Adjust for Sunday
		endOfWeek.setDate(startOfWeek.getDate() + 6);  // Adjust for Saturday
	
	  
		// Format dates to match the format in the database (if needed)
		const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
		const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

		const formattedStartOfWeekTimestamp = startOfWeek.toISOString()

		const formattedEndOfWeekTimestamp = endOfWeek.toISOString()

	return { formattedEndOfWeek, formattedStartOfWeek, formattedEndOfWeekTimestamp, formattedStartOfWeekTimestamp }
} 