export const convertTimestampToDate = (timestamp: number) : string => {
  const date = new Date(Number(timestamp));
  const now = new Date();

  //console.log(new Date('2025-11-02T00:00:00Z').getTime());
  
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return 'today';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
}