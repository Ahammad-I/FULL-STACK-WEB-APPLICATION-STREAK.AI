import React, { useState } from 'react';
import Tile from './Tile';

const Grid = () => {
  const [start, setStart] = useState(null);  // Holds the start tile coordinates
  const [end, setEnd] = useState(null);      // Holds the end tile coordinates
  const [path, setPath] = useState([]); 
  
 
 
  




 /* const fetchPath = async (endCoords) => {
    const response = await fetch("http://localhost:5001/api/find-path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start, end: endCoords }),
    });
    const data = await response.json();
    console.log(data.path); // Log the path for debugging
    setPath(data.path);  // Update the path
  };*/

  const fetchPath = async (endCoords) => {
    const response = await fetch("http://localhost:5001/api/find-path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start, end: endCoords }),  // Send start and end to backend
    });
    
    const data = await response.json();
    
    // Reset the path to ensure only the new path is shown
    setPath([]);  // Clear existing path
    setPath(data.path);  // Update with the new path received
  };
  
  

  // Holds the path between start and end

  // Handle the click on a tile
  const handleTileClick = (x, y) => {
    if (!start) {
      setStart([x, y]);  // Set the start tile
    } else if (!end) {
      setEnd([x, y]);    // Set the end tile and fetch the path
      fetchPath([x, y]);
    }
  };

 
  return (
    <div className="grid">
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <Tile
            key={`${row}-${col}`}
            x={row}
            y={col}
            isStart={start && start[0] === row && start[1] === col}
            isEnd={end && end[0] === row && end[1] === col}
            isPath={path.some(([px, py]) => px === row && py === col)}
            onClick={() => handleTileClick(row, col)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
