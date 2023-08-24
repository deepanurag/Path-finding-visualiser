export function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	const { row, col } = node;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

	return neighbors.filter( neighbor => !neighbor.isVisited );
}

export function sortNodesByDistance(nodes) {
	nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function getAllNodes(grid) {
	const nodes = [];
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}

	return nodes;
}

export function getNodesInShortestPathOrder( finishNode ) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while( currentNode != null ) {
        nodesInShortestPathOrder.unshift( currentNode );
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}
