// Testing libraries
import { render, screen, fireEvent, within } from '@testing-library/react';
import renderer from "react-test-renderer";

// Component
import Dropdown from '../Dropdown';

describe("<Dropdown />", () => {
  /** Fake props to be passed down to <Dropdown /> */
  const bodyComponent = (
    <div>
      <p>Body</p>
      <button type="button">Back</button>
      <button type="button">Next</button>
    </div>
  );
  
  const headerComponent = (<h1>Tile</h1>);

  const styles = {
    body: "body",
    container: "container",
    header: "header",
  };

  const MockDropdown = () => (
    <Dropdown 
      bodyComponent={bodyComponent}
      headerComponent={headerComponent}
      id="Dropdown"
      styles={styles}
    />
  );
      
  it("should render Dropdown component", () => {
    render(<MockDropdown />);
    // screen.debug();
    
    expect(screen.getByTestId("Dropdown")).toBeInTheDocument();
  });
    
  it(`should contain header and body components.`, () => {
    const { getByTestId } = render(<MockDropdown />);
    const Dropdown = getByTestId("Dropdown");
    // Checks whether the expected elements were inserted.
    expect(within(Dropdown).getByTestId("Header")).toBeTruthy();
    expect(within(Dropdown).getByTestId("Body")).toBeTruthy();
  });
    
  it(`clicking on header should be able to display body when closed or collapse body when open.`, () => {
    const { getByTestId } = render(<MockDropdown />);
    const Dropdown = getByTestId("Dropdown");
    const header = within(Dropdown).getByTestId("Header");
    const body = within(Dropdown).getByTestId("Body");
    /** Mocks clicking on header to display body. */
    fireEvent.click(header);
    /** body should be displayed. */
    expect(body).not.toHaveStyle("display: none;");
    /** Mocks clicking on header to collapse body. */
    fireEvent.click(header);
    /** body should Not be displayed. */
    expect(body).toHaveStyle("display: none;");
    /** Mocks clicking on header to display body once again. */
    fireEvent.click(header);
    /** Finally, body should be displayed. */
    expect(body).not.toHaveStyle("display: none;");
  });

  it(`should match the snapshot of initial render`, () => {
      const tree = renderer.create(<MockDropdown />, ).toJSON();
      expect(tree).toMatchSnapshot();
  });
});