import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders login UI with required fields", () => {
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
});

test("shows error near action for invalid credentials", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "user@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: "wrong-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
  expect(
    screen.getByText(/invalid email or password\. please try again\./i)
  ).toBeInTheDocument();
});
