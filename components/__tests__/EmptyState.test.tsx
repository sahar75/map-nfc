import React from "react";
import { render } from "@testing-library/react-native";
import EmptyState from "../EmptyState";

describe("EmptyState Component", () => {
  it("renders correctly with the given title", () => {
    const title = "No Data Available";
    const { getByText } = render(<EmptyState title={title} />);

    // Check if the title is rendered
    const titleElement = getByText(title);
    expect(titleElement).toBeTruthy();
  });

  it("renders correctly with a different title", () => {
    const title = "Loading...";
    const { getByText } = render(<EmptyState title={title} />);

    // Check if the title is rendered
    const titleElement = getByText(title);
    expect(titleElement).toBeTruthy();
  });
});
