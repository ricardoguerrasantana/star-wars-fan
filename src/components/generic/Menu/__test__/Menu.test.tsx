// Testing libraries
import { render, screen, fireEvent, within } from '@testing-library/react';
import renderer from "react-test-renderer";

// Component
import Menu from '../Menu';

describe("<Menu />", () => {
  /** Fake props to be passed down to <Menu /> */
  const handleClick = jest.fn();
  /** Defining itmes array. */
  const Button = (
    <button 
      data-testid="button" 
      type="button" 
    />
  );
  const item = {
    element: Button,
    handleClick: handleClick,
    styles: "itemStyles",
  };
  const items = [
    {...item , id: "1", pointer: false},
    {...item , id: "2", pointer: true},
    {...item , id: "3", pointer: false},
    {...item , id: "4", pointer: true},
    {...item , id: "5", pointer: false},
  ]
  /** Menu styles. */
  const styles = {container: "containerStyles"}
  /** Number of click fires on item. */
  const clickTimes = 3;

  const MockMenu = () => (
    <Menu 
      items={items}
      styles={styles}
    />
  );
    
  it("should render menu component", () => {
    render(<MockMenu />);
    // screen.debug();
    
    expect(screen.getByTestId("Menu")).toBeInTheDocument();
  });
      
  it(`should render ${items.length} menu items.` , () => {
    render(<MockMenu />);
    const itemElements = screen.getAllByTestId("item");
    expect(itemElements.length).toBe(items.length);
  });
    
  it(`Menu items should be able to render ${items.length} elements each within an item.`, () => {
    const { getAllByTestId } = render(<MockMenu />);
    const itemElements = getAllByTestId("item");
    // Checks whether the expected element was inserted within each item.
    itemElements.forEach((element) => {
      expect(within(element).getByTestId("button")).toBeTruthy();
    });
  });
    
  it(`should click each of the ${items.length} button components ${clickTimes} times each.`, () => {
    const { getAllByTestId } = render(<MockMenu />);
    const itemElements = getAllByTestId("item");
    // Mocks clicking several times an item in menu.
    itemElements.forEach((item) => {
      for (let i = 0; i < clickTimes; i++) {
        fireEvent.click(item);
      }
    }); 
    expect(handleClick).toBeCalledTimes(itemElements.length * clickTimes);
  });


  it(`should test pointer is able to be set up on items.`, () => {
    const { getAllByTestId } = render(<MockMenu />);
    const itemElements = getAllByTestId("item");
    // Checks for defined cursor pointer style items
    expect(itemElements[0]).not.toHaveStyle("cursor: pointer;");
    expect(itemElements[1]).toHaveStyle("cursor: pointer;");
    expect(itemElements[2]).not.toHaveStyle("cursor: pointer;");
    expect(itemElements[3]).toHaveStyle("cursor: pointer;");
    expect(itemElements[4]).not.toHaveStyle("cursor: pointer;");
  });

  it(`should match the snapshot of initial render`, () => {
      const tree = renderer.create(<MockMenu />, ).toJSON();
      expect(tree).toMatchSnapshot();
  });
});