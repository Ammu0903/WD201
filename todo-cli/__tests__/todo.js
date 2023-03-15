/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todolist Testing", () => {
  beforeAll(() => {
    add({
      title: "DAA algorithums",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new todo items", () => {
    let length = all.length;

    add({
      title: "node js learning",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("check Mark completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrive a overdue item", () => {
    let check_test = overdue();

    expect(
      check_test.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrive a new dueToday item", () => {
    let check_test = dueToday();

    expect(
      check_test.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrive a new dueLater item", () => {
    let check_test = dueLater();

    expect(
      check_test.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
