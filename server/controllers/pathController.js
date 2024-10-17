// DFS algorithm to find the path between two points in a 20x20 grid
/*const dfs = (grid, start, end) => {
    const [sx, sy] = start;
    const [ex, ey] = end;
    let path = [];
  
    const dfsHelper = (x, y, visited) => {
      if (x === ex && y === ey) return true;
  
      visited.add(`${x},${y}`);
      const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0], // Right, Down, Left, Up
      ];
  
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
  
        // Check boundaries and if the node is visited
        if (nx >= 0 && nx < 20 && ny >= 0 && ny < 20 && !visited.has(`${nx},${ny}`)) {
          if (dfsHelper(nx, ny, visited)) {
            path.push([nx, ny]);
            return true;
          }
        }
      }
      return false;
    };
  
    dfsHelper(sx, sy, new Set());
    path.push(start);
    return path.reverse();
  };
  
  // API to handle POST request for finding path
  exports.findPath = (req, res) => {
    const { start, end } = req.body;
  
    // Create a 20x20 grid (you can modify this to have obstacles if needed)
    const grid = Array(20).fill().map(() => Array(20).fill(0));
  
    // Get the path using DFS
    const path = dfs(grid, start, end);
  
    // Respond with the calculated path
    res.json({ path });
  };
  */// BFS algorithm to find the shortest path between two points in a 20x20 grid
const bfs = (grid, start, end) => {
    const [sx, sy] = start;
    const [ex, ey] = end;
    const queue = [[sx, sy]];
    const visited = new Set();
    const prev = {}; // To reconstruct the path

    visited.add(`${sx},${sy}`);

    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0], // Right, Down, Left, Up
    ];

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (x === ex && y === ey) {
            // Reconstruct the path from end to start
            const path = [];
            let current = `${x},${y}`;
            while (current) {
                const coords = current.split(',').map(Number);
                path.push(coords);
                current = prev[current];
            }
            return path.reverse();
        }

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Check boundaries and if the node is visited
            if (nx >= 0 && nx < 20 && ny >= 0 && ny < 20 && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                queue.push([nx, ny]);
                prev[`${nx},${ny}`] = `${x},${y}`; // Track the path
            }
        }
    }

    return []; // Return an empty path if no path is found
};

// API to handle POST request for finding path
exports.findPath = (req, res) => {
    const { start, end } = req.body;

    // Create a 20x20 grid (you can modify this to have obstacles if needed)
    const grid = Array(20).fill().map(() => Array(20).fill(0));

    // Get the shortest path using BFS
    const path = bfs(grid, start, end);

    // Respond with the calculated path
    res.json({ path });
};
