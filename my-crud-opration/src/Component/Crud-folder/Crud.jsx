import React, { useState } from "react";

import "../Crud-folder/Crud.css"

function Crud() {
  const [cards, setCards] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;
    if (editIndex !== null) {
      const updated = [...cards];
      updated[editIndex] = input;
      setCards(updated);
      setEditIndex(null);
    } else {
      setCards([...cards, input]);
    }
    setInput("");
  };

  const handleEdit = (index) => {
    setInput(cards[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = cards.filter((_, i) => i !== index);

    setCards(filtered);
    if (editIndex === index) {
      setInput("");
      editIndex(null);
    }
  };

  const filterCards = cards.filter((card) =>
    card.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="Maincontainer">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Text Value"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="glow"
            />
            <button className="button-one vibrate" type="submit">
              {editIndex !== null ? "update" : "Add"}
            </button>
          </form>

          <input
            type="search"
            placeholder="Search any value"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="wrapper2 pop">
            {filterCards.length > 0 ? (
              filterCards.map((card, index) => (
                <div className="wrapper2" key={index}>
                  {card}
                  <button
                    className="button-two"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-three"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>Data not Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;
