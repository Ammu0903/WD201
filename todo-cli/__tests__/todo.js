/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Test list of items", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Add overdue item", async () => {
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(-2),
      completed: false,
    });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Add due today item", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(0),
      completed: false,
    });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueTodayItems.length + 1);
  });

  test("Add due later item", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Mark as complete functionality", async () => {
    const overdueItems = await db.Todo.overdue();
    const Todos = overdueItems[0];
    expect(Todos.completed).toBe(false);
    await db.Todo.markAsComplete(Todos.id);
    await Todos.reload();

    expect(Todos.completed).toBe(true);
  });

  test("Test completed displayable string", async () => {
    const overdueItems = await db.Todo.overdue();
    const Todos = overdueItems[0];
    expect(Todos.completed).toBe(true);
    const displayValues = Todos.displayableString();
    expect(displayValues).toBe(
      `${Todos.id}. [x] ${Todos.title} ${Todos.dueDate}`
    );
  });

  test("Test incomplete displayable string", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const Todos = dueLaterItems[0];
    expect(Todos.completed).toBe(false);
    const displayValues = Todos.displayableString();
    expect(displayValues).toBe(
      `${Todos.id}. [ ] ${Todos.title} ${Todos.dueDate}`
    );
  });

  test("Test incomplete dueToday displayable string", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const Todos = dueTodayItems[0];
    expect(Todos.completed).toBe(false);
    const displayValues = Todos.displayableString();
    expect(displayValues).toBe(`${Todos.id}. [ ] ${Todos.title}`);
  });

  test("Test completed dueToday displayable string", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const Todos = dueTodayItems[0];
    expect(Todos.completed).toBe(false);
    await db.Todo.markAsComplete(Todos.id);
    await Todos.reload();
    const displayValues = Todos.displayableString();
    expect(displayValues).toBe(`${Todos.id}. [x] ${Todos.title}`);
  });
});
