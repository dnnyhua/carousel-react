import React from "react";
import { render, fireEvent, queryByAltText } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Smoke Test
it("renders without breaking", () => {
  render(<Carousel />)
})

// Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})


// Test to see if leftArrow is working properly
it("should give image 1 instead of image 3 when on image 2", () => {
  const { getByTestId, getByText } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow")
  fireEvent.click(rightArrow)
  expect(getByText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  fireEvent.click(leftArrow)
  expect(getByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

})

it("hide and unhide arrow button when on first image or last image", () => {
  const { getByTestId } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow")

  // left arrow is hidden, right arrow is showing
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // click right to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // left arrow should be showing, right arrow is hidden
  expect(rightArrow).toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");




})

