import Summary from "./summary";
import { render, screen } from "@testing-library/react"

test("Rendering Summary", () => {
    render(<Summary username={"test"}/>)

    const element = screen.getByText(/your balance/i)

    expect(element).toBeInTheDocument()
})
