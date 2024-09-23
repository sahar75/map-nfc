// SearchInput.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchInput from "../SearchInput";

describe("SearchInput Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders correctly with default props", () => {
    const { getByPlaceholderText } = render(
      <SearchInput onSubmit={mockOnSubmit} placeholder="Search..." />
    );

    const input = getByPlaceholderText("Search...");
    expect(input).toBeTruthy();
  });

  it("displays initial query", () => {
    const initialQuery = "test query";
    const { getByDisplayValue } = render(
      <SearchInput initialQuery={initialQuery} onSubmit={mockOnSubmit} />
    );

    const input = getByDisplayValue(initialQuery);
    expect(input).toBeTruthy();
  });

  it("calls onSubmit when the search icon is pressed", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput onSubmit={mockOnSubmit} placeholder="Search..." />
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.changeText(input, "new query");
    fireEvent.press(getByTestId("button"));

    expect(mockOnSubmit).toHaveBeenCalledWith("new query");
  });

  it("calls onSubmit when the input is submitted", () => {
    const { getByPlaceholderText } = render(
      <SearchInput onSubmit={mockOnSubmit} placeholder="Search..." />
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.changeText(input, "another query");

    fireEvent(input, "onSubmitEditing", {
      nativeEvent: { text: "another query" },
    });

    expect(mockOnSubmit).toHaveBeenCalledWith("another query");
  });
});
