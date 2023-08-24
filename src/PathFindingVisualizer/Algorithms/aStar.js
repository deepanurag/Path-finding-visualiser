import { getAllNodes, sortNodesByDistance, getUnvisitedNeighbors } from "./helperFunctions"

export function aStar(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid);
	//const distanceFromStartCell = new Map();

	while (!!unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);

		const closestNode = unvisitedNodes.shift();

		if (closestNode.isWall) continue;

		if (closestNode.distance === Infinity) return visitedNodesInOrder;

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);

		if (closestNode === finishNode) return visitedNodesInOrder;

		updateUnvisitedNeighbors(closestNode, grid, startNode, finishNode);
	}
}

function updateUnvisitedNeighbors(node, grid, startNode, finishNode) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

	for (const neighbor of unvisitedNeighbors) {
        const { row, col } = neighbor;
		neighbor.distance =
			Math.abs(row - startNode.row) +
			Math.abs(col - startNode.col) +
			(Math.abs(row - finishNode.row) +
				Math.abs(col - finishNode.col));

        neighbor.previousNode = node;
	}
}