import { addDays, endOfDay, endOfToday, endOfWeek, endOfYesterday, format, startOfDay, startOfToday, startOfWeek, startOfYesterday, subDays } from "date-fns";

export function timeAgo(timestamp: string) {
	const now = new Date();
	const time = new Date(timestamp);
	const diffInSeconds = Math.max(0, Math.floor((now.getTime() - time.getTime()) / 1000));

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

export function startEndOfWeek(date: Date){
	// Calculate the start and end of the week based on the provided date
		const startOfWeekDate = startOfWeek(date,{ weekStartsOn: 0} );
		const endOfWeekDate = endOfWeek(date, { weekStartsOn: 0 });
	  
		// Format dates to match the format in the database (if needed)
		const formattedStartOfWeek = format(startOfWeekDate, 'yyyy-MM-dd');
		const formattedEndOfWeek = format(endOfWeekDate, 'yyyy-MM-dd');

	// Format dates as ISO strings
	const formattedStartOfWeekISO = format(startOfWeekDate, "yyyy-MM-dd'T'00:00:00XXX");
	const formattedEndOfWeekISO = format(endOfWeekDate, "yyyy-MM-dd'T'23:59:59XXX");

	return { formattedEndOfWeek, formattedStartOfWeek, formattedStartOfWeekISO, formattedEndOfWeekISO }
} 

// Calculate the date yesterday
export function getYesterday(formatString: string){
	
	const yesterdayDateEnd = format(endOfYesterday(), formatString)

	const yesterdayDateStart = format(startOfYesterday(), formatString)
	return { yesterdayDateEnd, yesterdayDateStart }
}

// Calculate the date yesterday
export function getToday(formatString: string){
	
	const todayDateEnd = format(endOfToday(), formatString)

	const todayDateStart = format(startOfToday(), formatString)
	return { todayDateEnd, todayDateStart }
}


export function getLast7Days(formatString: string="yyyy-MM-dd") {
  const last7DaysStart = format(startOfDay(subDays(new Date(), 7)), formatString);
  const last7DaysEnd = format(endOfDay(subDays(new Date(), 1)), formatString);

  return { last7DaysStart, last7DaysEnd };
}



export function getLast30Days(formatString: string = "yyyy-MM-dd") {
  const last30DaysStart = format(startOfDay(subDays(new Date(), 30)), formatString);
  const last30DaysEnd = format(endOfDay(subDays(new Date(), 1)), formatString);

  return { last30DaysStart, last30DaysEnd };
}



export const generateWeekLabels = (selectedYear: number) => {
	const weeks = [];
	const currentDate = new Date();
	const startOfThisWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

	for (let i = 0; i < 5; i++) {
	  const startOfWeekDate = addDays(startOfThisWeek, -i * 7);
	  const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });
	  const label = `${format(startOfWeekDate, 'MMM d')} - ${format(endOfWeekDate, 'MMM d')}, ${selectedYear}`;
	  weeks.push({ label, value: label });
	}

	return weeks;
  };


