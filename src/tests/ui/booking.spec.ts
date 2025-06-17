import { test, expect } from "../../fixtures/pageObjectFixtures";
import { format } from "date-fns";

test("TC-B01: Booking selection with required information and submit", async ({
  page,
  pages,
}) => {
  const location = "München";
  const checkinOffsetInDays = 2;
  const durationInHours = 3;
  const visitors = 2;

  const today = new Date();
  const checkinDate = new Date(today);
  checkinDate.setDate(today.getDate() + checkinOffsetInDays);
  const formattedCheckinDate = `on ${format(checkinDate, "MMMM d")}`; // e.g. 'on May 14'

  await page.goto("/");

  await pages.booking.selectLocation(location);
  await pages.booking.setCheckinDateFromToday(checkinOffsetInDays);
  await pages.booking.selectPersons(visitors);
  await pages.booking.selectDuration(durationInHours);
  await pages.booking.submitBooking();

  const animation = page.locator("#animation-container");

  await expect(
    page
      .locator("#animation-container span")
      .filter({ hasText: `${location}` }),
  ).toBeVisible();
  await expect(animation.getByText(formattedCheckinDate)).toBeVisible();
  await expect(animation.getByText(`${visitors} visitor(s)`)).toBeVisible();
  await expect(
    animation.getByText(`for ${durationInHours} hours`),
  ).toBeVisible();
});
