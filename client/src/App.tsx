import { useEffect, useState } from 'react';
import './App.css';
import { getItems, addItem, deleteItem } from './client';
import { TodoItem } from './models';

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const initialize = async () =>{
      const items = await getItems();
      setItems(items);
    }

    initialize();
  }, [])

  const addNewItem = async (description: string) => {
      const newItem = await addItem(description);
      if(newItem){
        const newItemsList = [...items];
        newItemsList.push(newItem);
        setItems(newItemsList);
        setNewItem('');  
      }
  }

  const callDeleteItem = async (id: number) => {
      const success = await deleteItem(id);
      if(success){
        let updatedItemsList = [...items];
        const indexToDelete = items.findIndex(i => i.id === id);
        updatedItemsList.splice(indexToDelete, 1);
        setItems(updatedItemsList);  
      }
  }

  const listItems = items.map((i) => {
    return <li key={i.id}>{i.description} <button onClick={() => callDeleteItem(i.id)}>X</button></li>
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
        <button onClick={() => addNewItem(newItem)}>Add</button>

      </section>
    </div>
  );
}

export default App;
