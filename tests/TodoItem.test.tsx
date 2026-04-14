import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '@/app/TodoItem'

const todo = {
  id: '1',
  text: 'Buy milk',
  completed: false
}

describe("TodoItem", () => {
  it("renders todo text", () => {
    render(
      <TodoItem
        todo={todo}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onToggle={jest.fn()}
      />
    )
    expect(screen.getByDisplayValue("Buy milk")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox clicked", () => {
    const onToggle = jest.fn();
    render(
      <TodoItem
        todo={todo}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onToggle={onToggle}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onEdit={() => { }}
        onToggle={() => { }}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByText("x"));

    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when typing in input", () => {
    const onEdit = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onEdit={onEdit}
        onToggle={() => { }}
        onDelete={() => { }}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Buy milk"), {
      target: {value: "Buy coffee"}
    });

    expect(onEdit).toHaveBeenCalledWith("1", "Buy coffee");
  })
});

