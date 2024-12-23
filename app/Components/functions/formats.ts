export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Correct options with proper type values
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  return formattedDate;
}
export function formatDate2(dateString: string): string {
  const formattedDate = dateString.split("-").reverse().join("-");
  return formattedDate;
}

export function formatTime(timeString: string): string {
  // Create a new Date object using the provided time string
  const [hours, minutes] = timeString.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const hour12 = hours % 12 || 12; // If hour is 0 or 12, set it to 12

  // Return formatted time with AM/PM
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatId(id: any): any {
  // Extract the last 6 characters from the string
  return id.slice(-6);
}
export function formatListing(text: any) {
  return text.split(/\d+\.\s/).filter(Boolean);
}

export const formatDuration = (days: any) => {
  if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    return `${months} month${months > 1 ? "s" : ""} ${
      remainingDays > 0
        ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
        : ""
    }`;
  } else if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return `${weeks} week${weeks > 1 ? "s" : ""} ${
      remainingDays > 0
        ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
        : ""
    }`;
  } else {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};

export function formatCreatedAtDate(timestamp: any) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  // return `${day}-${month}-${year}, ${formattedTime}`;
  return `${day}-${month}-${year}`;
}

export function addDayInDate(baseDate: any, days: any) {
  let date: any = new Date(baseDate);
  date.setDate(date.getDate() + days);

  return date;
}

export function addMonthInDate(baseDate: any, months: any) {
  let date: any = new Date(baseDate);
  date.setMonth(date.getMonth() + months);

  return date;
}

export function addYearInDate(baseDate: any, years: any) {
  let date: any = new Date(baseDate);
  date.setFullYear(date.getFullYear() + years);

  return date;
}

export function getDiscountedPrice(totalValue: any, discountValue: any) {
  if (discountValue < 0 || discountValue > 100) {
    return "Invalid discount value";
  }

  const discountAmount = (totalValue * discountValue) / 100;

  return discountAmount;
}

export function isPlanExpired(plan: string, createdAt: string): boolean {
  const date = new Date(createdAt);
  const currentDate = new Date();

  switch (plan) {
    case "3-Day Trial":
      date.setDate(date.getDate() + 3);
      break;
    case "1 Month":
      date.setMonth(date.getMonth() + 1);
      break;
    case "3 Months":
      date.setMonth(date.getMonth() + 3);
      break;
    case "6 Months":
      date.setMonth(date.getMonth() + 6);
      break;
    case "1 Year":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  // Check if the plan has expired by comparing the expiry date with the current date
  return currentDate > date;
}



export function filterNumber(input: string): string {
  return input.replace(/[^a-zA-Z]/g, ""); // Allow only letters from a to z (case-insensitive)
}


