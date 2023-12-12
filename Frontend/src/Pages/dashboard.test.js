import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";

test("Testing dashboard loads", () => {
    render(<Dashboard/>)

    const element = screen.getByText(/add budget/i)

    expect(element).toBeInTheDocument()
})