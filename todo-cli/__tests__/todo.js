const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("Todo New Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Checking",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Cooking",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Clone Work",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("add new todo", () => {
    const todoItemsCounts = all.length;
    add([
      {
        title: "Over Due",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10),
      },
    ]);
    expect(all.length).toBe(todoItemsCounts + 1);
  });

  test("mark todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retreive of Overdue", () => {
    expect(overdue().length).toBe(1);
    add({
      title: "Buy  game",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(overdue().length).toBe(2);
  });

  test("retreive of due today", () => {
    expect(dueToday().length).toBe(1);
    add({
      title: "Do work",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(2);
  });

  test("retreival of dueLater", () => {
    expect(dueLater().length).toBe(1);
    add({
      title: "Checkingg",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(dueLater().length).toBe(2);
  });
});
