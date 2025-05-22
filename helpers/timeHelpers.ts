export function generateTimeSlots(
  startHour = 8,
  endHour = 18,
  interval = 30,
): string[] {
  const slots: string[] = [];
  for (let mins = startHour * 60; mins <= endHour * 60; mins += interval) {
    const date = new Date(0, 0, 0, 0, mins);
    slots.push(
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    );
  }
  return slots;
}

export function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
}
