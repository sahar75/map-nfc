import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RouteCard from "../RouteCard"; // Adjust the path as necessary
import { IRoute } from "../../types/route.types";

const mockRoute: IRoute = {
  atmName: "ATM 1",
  sourceName: "Source A",
  destinationName: "Destination B",
  distance: 0,
  duration: 0,
  id: "",
  location: { lat: 0, lng: 0 },
  points: [],
};

describe("RouteCard Component", () => {
  it("renders correctly with given props", () => {
    const { getByText } = render(
      <RouteCard item={mockRoute} onPress={() => {}} index={1} />
    );

    expect(getByText("Route 1")).toBeTruthy();
    expect(getByText("ATM:")).toBeTruthy();
    expect(getByText("ATM 1")).toBeTruthy();
    expect(getByText("Source")).toBeTruthy();
    expect(getByText("Source A")).toBeTruthy();
    expect(getByText("Destination")).toBeTruthy();
    expect(getByText("Destination B")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RouteCard item={mockRoute} onPress={mockOnPress} index={1} />
    );

    fireEvent.press(getByText("Route 1"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("applies selected styling when selected prop is true", () => {
    const { getByTestId } = render(
      <RouteCard item={mockRoute} onPress={() => {}} index={1} selected />
    );

    const pressable = getByTestId("route-card");
    expect(pressable.props.className).toContain("border-violet-700");
  });

  it("does not apply selected styling when selected prop is false", () => {
    const { getByTestId } = render(
      <RouteCard
        item={mockRoute}
        onPress={() => {}}
        index={1}
        selected={false}
      />
    );

    const pressable = getByTestId("route-card");
    expect(pressable.props.className).not.toContain("border-violet-700");
  });
});
