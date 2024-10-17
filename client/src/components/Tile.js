import React from 'react';

const Tile = ({ x, y, isStart, isEnd, isPath, onClick }) => {
  let className = "tile";
  if (isStart) className += " start";
  if (isEnd) className += " end";
  if (isPath) className += " path";

  return (
    <div className={className} onClick={onClick}>
      {x}, {y}
    </div>
  );
};

export default Tile;
