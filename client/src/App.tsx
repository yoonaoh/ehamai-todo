import { useEffect, useState } from 'react';
import './App.css';

interface TodoItem {
  id: number;
  description: string;
}

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const r = await fetch('http://localhost:3001/items');
      const json = await r.json() as any[];
      const items = json.map(item => item);
      setItems(items);
    }

    getItems().catch(e => console.log(e));
  }, [])

  const addItem = async (i: string) => {
    try {
      const r = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: i })
      });

      const json = await r.json();
      const newItemsList = [...items];
      newItemsList.push(json.description);
      setItems(newItemsList);
      setNewItem('');
    } catch (e) {
      console.log(e);
    }
  }

  const deleteItem = async (id: number) => {
    try {
      const r = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });

      let updatedItemsList = [...items];
      const indexToDelete = items.findIndex(i => i.id === id);
      updatedItemsList.splice(indexToDelete, 1);
      setItems(updatedItemsList);
    } catch (e) {
      console.log(e);
    }
  }

  const listItems = items.map((i) => {
    return <li key={i.id}>{i.description} <a onClick={() => deleteItem(i.id)}>X</a></li>
  });

  return (
    <div className="App">
      <header className="App-header">
        TODO List
      </header>
      <section>
        <ul>{listItems}
        </ul>
        <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}></input>
        <button onClick={() => addItem(newItem)}>Add</button>

      </section>
    </div>
  );
}

export default App;
