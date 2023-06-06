import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [item, setItem] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");

  const addValue = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: item,
      });
      setListItems((prev) => [...prev, res.data]);
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteValue = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      setUpdateItemText("");
      setIsUpdating("");
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating)
      const updatedItem = listItems[updatedItemIndex].item = updateItemText
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = () => {
    return (
      <form className="update-form" onSubmit={e=> updateItem(e)}>
        <input
          className="update-new-input"
          type="text"
          placeholder="new-item"
          onChange={(e) => setUpdateItemText(e.target.value)}
          value={updateItemText}
        />
        <button className="update-new-btn" type="submit">
          Update
        </button>
      </form>
    );
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={(e) => addValue(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>

      <div className="todo-list">
        {listItems.map((item, index) => (
          <div className="todo-item" key={index}>
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => setIsUpdating(item._id)}
                >
                  update
                </button>
                <button
                  className="delete-item"
                  onClick={() => deleteValue(item._id)}
                >
                  delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
