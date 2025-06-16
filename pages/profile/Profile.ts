import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ChangeData } from "./ChangeData";
import { ManageAddress } from "./ManageAddress";
import { ViewOrders } from "./ViewOrders";
import { StartBooking } from "./StartBooking";

export class Profile extends BasePage {
  readonly changeDataLink = this.page.getByRole("link", {
    name: "Change my data",
  });
  readonly manageAddressLink = this.page.getByRole("link", {
    name: "Manage Addresses",
  });
  readonly viewOrdersLink = this.page.getByRole("link", {
    name: "View my orders",
  });
  readonly startBookingLink = this.page.getByRole("link", {
    name: "Start a new booking",
  });

  constructor(page: Page) {
    super(page);
  }

  async clickSection(
    section: "changeData" | "manageAddresses" | "viewOrders" | "startBooking",
  ) {
    const locatorMap = {
      changeData: this.changeDataLink,
      manageAddresses: this.manageAddressLink,
      viewOrders: this.viewOrdersLink,
      startBooking: this.startBookingLink,
    };

    const locator = locatorMap[section];

    await locator.click();
  }

  async changeData(): Promise<ChangeData> {
    await this.changeDataLink.click();
    return new ChangeData(this.page);
  }

  async manageAddresses(): Promise<ManageAddress> {
    await this.manageAddressLink.click();
    return new ManageAddress(this.page);
  }

  async viewOrders(): Promise<ViewOrders> {
    await this.viewOrdersLink.click();
    return new ViewOrders(this.page);
  }

  async startBooking(): Promise<StartBooking> {
    await this.startBookingLink.click();
    return new StartBooking(this.page);
  }
}
