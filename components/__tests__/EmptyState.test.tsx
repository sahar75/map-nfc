import React from "react";
import TestRenderer from "react-test-renderer";
import EmptyState from "../EmptyState";

describe("EmptyState", () => {
  it("should render correctly with a title", () => {
    const tree = TestRenderer.create(
      <EmptyState title="No Data Available" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with an empty title", () => {
    const tree = TestRenderer.create(<EmptyState title="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
