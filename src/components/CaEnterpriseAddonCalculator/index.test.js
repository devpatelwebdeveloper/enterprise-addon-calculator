import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CaEnterpriseAddonCalculator from "./index";

afterEach(cleanup);

describe("CaEnterpriseAddonCalculator", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<CaEnterpriseAddonCalculator />);
    expect(getByTestId("CaEnterpriseAddonCalculator")).toMatchSnapshot();
  });
  test("updates total", () => {
    const { getByTestId } = render(<CaEnterpriseAddonCalculator />);
    expect(getByTestId("total").innerHTML).toBe("$380");
    fireEvent.click(getByTestId("users-10"));
    expect(getByTestId("total").innerHTML).toBe("$569");
  });
  test("updates total with toggle", () => {
    const { getByTestId } = render(<CaEnterpriseAddonCalculator />);
    expect(getByTestId("total").innerHTML).toBe("$380");
    fireEvent.click(getByTestId("inventory-toggle"));
    expect(getByTestId("total").innerHTML).toBe("$486");
  });
});
