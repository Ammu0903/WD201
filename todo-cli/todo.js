//Main Js File
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (item) => item.dueDate < new Date().toISOString().slice(0, 10)
    );
  };

  const dueToday = () => {
    return all.filter(
      (item) => item.dueDate === new Date().toISOString().slice(0, 10)
    );
  };

  const dueLater = () => {
    return all.filter(
      (item) => item.dueDate > new Date().toISOString().slice(0, 10)
    );
  };

  const toDisplayableList = (list) => {
    const formattedResult = list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          item.dueDate.split("-")[2] === String(new Date().getDate())
            ? ""
            : item.dueDate
        }`
    );
    return formattedResult.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
