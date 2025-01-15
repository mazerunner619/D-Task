// returns todos[]
export const fetchAllTodos = async ({ contract, account }) => {
  try {
    if (!contract || !account) throw new Error("contract or account not found");
    const todos = await contract.methods.getAllTasks().call({
      from: account,
    });
    console.log(`fetched all todos for account: ${account}`);
    return todos;
  } catch (error) {
    console.log("fetch all todos error: ", error);
    return [];
  }
};

// returns true/false
export const createTodo = async ({ data, contract, account }) => {
  try {
    if (!data || !contract || !account)
      throw new Error("data or contract or account not found");
    const res = await contract.methods
      .createTask(data.description, data.deadline)
      .send({
        from: account,
      });
    console.log("create todo response: ", res);
    return true;
  } catch (error) {
    console.log("create todo error: ", error);
    return false;
  }
};

export const deleteTodo = async ({ index, contract, account }) => {
  try {
    if (!index || !contract || !account)
      throw new Error("index or contract or account not found");
    const res = await contract.methods.deleteTask(index).send({
      from: account,
    });
    console.log("delete todo response: ", res);
    return true;
  } catch (error) {
    console.log("delete todo error: ", error);
    return false;
  }
};

export const editTodo = async ({ data, contract, account }) => {
  try {
    if (!data || !contract || !account)
      throw new Error("data or contract or account not found");
    const res = await contract.methods
      .updateTask(data.index, data.description, data.deadline, data.done)
      .send({
        from: account,
      });
    console.log("edit todo response: ", res);
    return data;
  } catch (error) {
    console.log("edit todo error: ", error);
    return null;
  }
};
