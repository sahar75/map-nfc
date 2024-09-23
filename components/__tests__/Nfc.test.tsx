import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Nfc from "../Nfc"; // Adjust the path if necessary
import NfcManager from "react-native-nfc-manager";
import SimCardsManagerModule from "react-native-sim-cards-manager";
import { router } from "expo-router";

jest.mock("react-native-nfc-manager");
jest.mock("react-native-sim-cards-manager", () => ({
  getSimCards: jest.fn(() => Promise.resolve([{ id: "sim1" }])),
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("Nfc Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the scan button", () => {
    const { getByText } = render(<Nfc />);
    expect(getByText("Scan a Tag")).toBeTruthy();
  });

  it("starts scanning on button press", async () => {
    (NfcManager.requestTechnology as jest.Mock).mockResolvedValueOnce(
      undefined
    );
    (NfcManager.getTag as jest.Mock).mockResolvedValueOnce({ id: "tag-id" });

    const { getByText } = render(<Nfc />);
    const button = getByText("Scan a Tag");

    fireEvent.press(button);
    expect(getByText("Scanning...")).toBeTruthy();

    await waitFor(() => {
      expect(NfcManager.requestTechnology).toHaveBeenCalled();
      expect(NfcManager.getTag).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith("/map");
    });
  });

  it("handles NFC errors gracefully", async () => {
    (NfcManager.requestTechnology as jest.Mock).mockRejectedValueOnce(
      new Error("NFC error")
    );

    const { getByText } = render(<Nfc />);
    const button = getByText("Scan a Tag");

    fireEvent.press(button);
    expect(getByText("Scanning...")).toBeTruthy();

    await waitFor(() => {
      expect(NfcManager.requestTechnology).toHaveBeenCalled();
      expect(NfcManager.cancelTechnologyRequest).toHaveBeenCalled();
      expect(getByText("Scan a Tag")).toBeTruthy();
    });
  });

  it("fetches SIM card info on mount", async () => {
    render(<Nfc />);

    await waitFor(() => {
      expect(SimCardsManagerModule.getSimCards).toHaveBeenCalled();
    });
  });
});
