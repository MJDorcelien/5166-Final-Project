import Summary from "./summary";
import { render, screen } from "@testing-library/react"

// describe(Summary, () => {
//     it("summary will display balance", () => {
//         const {getByTestId} = render(<Summary username={"test"}/>);
//         const usernameValue = getByTestId("username")
//     })
// })

test("Rendering Summary", () => {
    render(<Summary username={"test"}/>)

    const element = screen.getByText(/your balance/i)

    expect(element).toBeInTheDocument()
})
