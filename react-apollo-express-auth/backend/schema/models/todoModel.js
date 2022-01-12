const Todo = require("../../db/model/TodoModel");
const dotenv = require("dotenv");
dotenv.config();

const generateTodoModel = ({ user }) => ({
  queries: {
    getTodoList: async () => {
      try {
        const allTodos = await Todo.find({ owner_id: user.id }, (err, data) => {
          if (err) return err;
          else return data;
        });
        return allTodos;
      } catch (error) {
        return {
          msg: "Unauthrorized",
        };
      }
    },
  },
  mutations: {
    addTodo: async (todo) => {
      try {
        const newTodo = await new Todo({ ...todo, owner_id: user.id })
          .save()
          .then((data) => {
            return data;
          })
          .catch((err) => err);
        return newTodo;
      } catch (error) {
        console.log("Unauthorized");
        throw new Error(error);
      }
    },

    updateTodo: (body) =>
      new Promise(async (resolve, reject) =>
        user
          ? await Todo.findByIdAndUpdate(body.id, body.query, (err, todo) =>
              err ? reject(err) : resolve(todo)
            )
          : await Todo.findById(body.id, async (err, todo) =>
              err
                ? reject(err)
                : user._id.toString() === todo.owner_id.toString()
                ? await Todo.findByIdAndUpdate(
                    body.id,
                    body.query,
                    (err, todo) => (err ? reject(err) : resolve(todo))
                  )
                : reject(new Error("Unauthorized"))
            )
      ),
    deleteTodo: (id) =>
      new Promise(async (resolve, reject) =>
        user
          ? await Todo.findByIdAndDelete({ _id: id }, (err, todo) =>
              err ? reject(err) : resolve(todo)
            )
          : await Todo.findById({ _id: id }, async (err, todo) =>
              err
                ? reject(err)
                : user._id.toString() === todo.owner_id.toString()
                ? await Todo.findByIdAndDelete(id, (err, todo) =>
                    err ? reject(err) : resolve(todo)
                  )
                : reject(new Error("Unauthorized"))
            )
      ),
  },
});

module.exports = generateTodoModel;
