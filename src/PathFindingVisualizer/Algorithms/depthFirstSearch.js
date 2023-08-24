import { getUnvisitedNeighbors } from "./helperFunctions";

export function depthFirstSearch(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];
	const unvisitedNodes = [startNode];

	while (!!unvisitedNodes.length) {
		const closestNode = unvisitedNodes.shift();

		if (closestNode.isVisited) continue;

		if (closestNode.isWall) continue;

		// if ( closestNode.distance === Infinity ) return visitedNodesInOrder;

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);

		if (closestNode === finishNode) return visitedNodesInOrder;

		updateUnvisitedNeighbors(closestNode, grid, unvisitedNodes);
	}
}

function updateUnvisitedNeighbors(node, grid, unvisitedNodes) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

	for (const neighbor of unvisitedNeighbors) {
		neighbor.previousNode = node;
		unvisitedNodes.unshift(neighbor);
	}
}
