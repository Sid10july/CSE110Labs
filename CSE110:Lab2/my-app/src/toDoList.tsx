// src/toDoList.tsx
import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom"; 

export function ToDoList() {

  const { name } = useParams();

  const [numRemainingItems, setNumRemainingItems] = useState(0);
  const [items, setItems] = useState(dummyGroceryList);

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox: HTMLInputElement = e.target as HTMLInputElement;
    const itemName = checkbox.name;

    const updatedItems = items.map((item) => 
      item.name === itemName ? { ...item, isPurchased: checkbox.checked } : item
    );

    const uncheckedItems = updatedItems.filter((item) => !item.isPurchased);
    const checkedItems = updatedItems.filter((item) => item.isPurchased);

    const newItems = uncheckedItems.concat(checkedItems);
    setItems(newItems);

    const diff = checkbox.checked ? 1 : -1;
    setNumRemainingItems(numRemainingItems + diff);
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        <form action=".">
          {items.map((item) => (
            <ListItem key={item.name} item={item} changeHandler={handleCheckboxClick} />
          ))}
        </form>
        Items bought: {numRemainingItems}
      </div>
    </div>
  );
}

interface ListItemProps {
  item: GroceryItem;
  changeHandler: ChangeEventHandler;
}

function ListItem({ item, changeHandler }: ListItemProps) {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            onChange={changeHandler}
            checked={item.isPurchased}
            name={item.name}
          />
          {item.name}
        </label>
      </div>
    );
  }