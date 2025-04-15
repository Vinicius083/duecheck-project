export function parseBrDate(dateStr: string | undefined): Date | null {
    if (!dateStr?.trim()) return null;
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return null;
  
    const isoString = `${year}-${month}-${day}`;
    const parsedDate = new Date(isoString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }
  