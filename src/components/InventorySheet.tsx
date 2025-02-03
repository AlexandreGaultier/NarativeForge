import { FC, useState } from 'react';
import './InventorySheet.css';

interface Item {
  id: string;
  name: string;
  effect: string;
}

const InventorySheet: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', effect: '' });
  const [isItemFormVisible, setIsItemFormVisible] = useState(false);

  const addItem = () => {
    if (newItem.name && newItem.effect) {
      setItems([...items, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ name: '', effect: '' });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="inventory-sheet">
      <div className="inventory-header">
        <h2>Équipement</h2>
        <button 
          className="add-item-button"
          onClick={() => setIsItemFormVisible(!isItemFormVisible)}
        >
          {isItemFormVisible ? '−' : '+'}
        </button>
      </div>
      
      {isItemFormVisible && (
        <div className="add-item">
          <input
            type="text"
            placeholder="Nom de l'objet"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Effet"
            value={newItem.effect}
            onChange={(e) => setNewItem({ ...newItem, effect: e.target.value })}
          />
          <button onClick={addItem}>Ajouter</button>
        </div>
      )}
      
      <div className="items-list">
        {items.map(item => (
          <div key={item.id} className="item-row">
            <div className="item-info">
              <strong>{item.name}</strong>
              <span>{item.effect}</span>
            </div>
            <button onClick={() => removeItem(item.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySheet; 