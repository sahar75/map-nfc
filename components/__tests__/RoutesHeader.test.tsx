import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import RoutesHeader from "../RoutesHeader";
import { useRecommendationStore } from "../../store/recommendations";

jest.mock("../../store/recommendations");

describe("RoutesHeader Component", () => {
  const setRecommendationsMock = jest.fn();
  const allRecommendationsMock = [
    { atmName: "ATM 1" },
    { atmName: "ATM 2" },
    { atmName: "ATM 3" },
  ];

  beforeEach(() => {
    // Type the mocked function correctly
    (useRecommendationStore as jest.MockedFunction<any>).mockReturnValue({
      setRecommendations: setRecommendationsMock,
      allRecommendations: allRecommendationsMock,
    });
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<RoutesHeader />);

    expect(getByText("Recommended Routes")).toBeTruthy();
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("filters recommendations based on search input", () => {
    const { getByPlaceholderText } = render(<RoutesHeader />);
    const searchInput = getByPlaceholderText("Search...");

    // Simulate typing in the search input
    fireEvent.changeText(searchInput, "ATM 1");

    // Trigger the submit event
    fireEvent(searchInput, "onSubmitEditing", {
      nativeEvent: { text: "ATM 1" },
    });

    expect(setRecommendationsMock).toHaveBeenCalledWith([{ atmName: "ATM 1" }]);
  });

  it("does not filter recommendations when search input is empty", () => {
    const { getByPlaceholderText } = render(<RoutesHeader />);
    const searchInput = getByPlaceholderText("Search...");

    // Simulate clearing the input
    fireEvent.changeText(searchInput, ""); // Set the text to empty

    // Trigger the submit event
    fireEvent(searchInput, "onSubmitEditing", { nativeEvent: { text: "" } });

    // Check that the recommendations are set to all recommendations
    expect(setRecommendationsMock).toHaveBeenCalledWith(allRecommendationsMock);
  });
});
