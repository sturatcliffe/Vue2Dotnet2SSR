export const fetchTodos = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const todos = ["Todo 1", "Todo 2", "Todo 3"];
    commit("setTodos", todos);
    resolve(todos);
  });
};
