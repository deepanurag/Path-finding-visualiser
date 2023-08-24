import { getUnvisitedNeighbors } from "./helperFunctions";

export function breadthFirstSearch( grid, startNode, finishNode ) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = [ startNode ];
    console.log( unvisitedNodes + "\n" + unvisitedNodes.length )

    while ( !!unvisitedNodes.length ) {
        const closestNode = unvisitedNodes.shift();

        if ( closestNode.isWall ) continue;

        if ( closestNode.isVisited ) continue;

        if ( closestNode.distance === Infinity ) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        console.log("reached here:\t" + visitedNodesInOrder.length);

        if ( closestNode === finishNode ) return visitedNodesInOrder;

        updateUnvisitedNeighbors( closestNode, grid, unvisitedNodes );
    }
}

function updateUnvisitedNeighbors( node, grid, unvisitedNodes ) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for ( const neighbor of ( unvisitedNeighbors ) ) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        unvisitedNodes.push(neighbor);
    }
}