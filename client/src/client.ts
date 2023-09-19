import { TodoItem } from "./models";

export const getItems = async () => {
    let items: TodoItem[] = [];
    try{
        const r = await fetch('http://localhost:3001/items');
        items = await r.json() as TodoItem[]; 
    }catch(e){
        console.log(e);
    }

    return items;
}

export const addItem = async (description: string) =>{
    try {
        const r = await fetch('http://localhost:3001/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ description: description })
        });
  
        return await r.json();
    }catch(e){
        console.log(e);
    }
}

export const deleteItem = async (id: number) =>{
    try {
        await fetch(`http://localhost:3001/items/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });
    } catch(e){
        console.log(e);
        return false;
    }

    return true;
}