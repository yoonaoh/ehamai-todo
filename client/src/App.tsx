import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const onAdd = async (i: string) => {

    const newItemsList = [...items];
    newItemsList.push(i);
    setItems(newItemsList);
    setNewItem('');
  }

  useEffect(() =>{
    const getItems = async ()=>{
      const r = await fetch('http://localhost:3001/items');
      const json = await r.json() as any[];
      const items = json.map(item => item.description);
      setItems(items);
    }
  
    getItems().catch(e => console.log(e));
  }, [])

  const listItems = items.map((i, n) => <li key={n}>{i}</li>);

  return (
    <div className="App">
      <header className="App-header">
        TODO List
      </header>
      <section>
        <ul>{listItems}
        </ul>
        <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}></input>
        <button onClick={() => onAdd(newItem)}>Add</button>

      </section>
    </div>
  );
}

export default App;
