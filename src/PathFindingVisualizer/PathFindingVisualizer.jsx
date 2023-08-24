import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFindingVisualizer.css";
import { dijkstra } from "./Algorithms/dijkstra";
import { getNodesInShortestPathOrder } from "./Algorithms/helperFunctions";
import { aStar } from "./Algorithms/aStar";
import { breadthFirstSearch } from "./Algorithms/breadthFirstSearch";
import { depthFirstSearch } from "./Algorithms/depthFirstSearch";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathFindingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			mouseIsPressed: false,
		};
	}

	componentDidMount() {
		const grid = getInitialGrid();
		this.setState({ grid });
	}

	handleMouseDown(row, col) {
		console.log("Mouse DOWN Fired!!");
		const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
		this.setState({ grid: newGrid, mouseIsPressed: true });
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed) return;

		const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
		this.setState({ grid: newGrid, mouseIsPressed: true });
	}

	handleMouseUp() {
		console.log("Mouse UP Fired!!");
		this.setState({ mouseIsPressed: false });
	}

	animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
		for (let i = 0; i < visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length - 1) {
				setTimeout(() => {
					this.animateShortestPath(nodesInShortestPathOrder);
				}, 10 * i);
				return;
			}

			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				document.getElementById(
					`node-${node.row}-${node.col}`
				).className = `node node-visited`;
			}, 10 * i);
		}
	}

	animateShortestPath(nodesInShortestPathOrder) {
		for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				document.getElementById(
					`node-${node.row}-${node.col}`
				).className = `node node-shortest-path`;
			}, 50 * i);
		}
	}

	visualizeDijkstra() {
		const { grid } = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);
		this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}

	visualizeAStar() {
		const { grid } = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = aStar(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);
		this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}

	visualizeBFS() {
		const { grid } = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);
		this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}

	visualizeDFS() {
		const { grid } = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
		const nodesInShortestPathOrder =
			getNodesInShortestPathOrder(finishNode);
		this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}

	render() {
		const { grid, mouseIsPressed } = this.state;

		return (
			<>
				<button onClick={() => this.visualizeDijkstra()}>
					Visualize Dijkstra's Algorithm
				</button>

				<button onClick={() => this.visualizeAStar()}>
					A* Algorithm
				</button>

				<button onClick={() => this.visualizeBFS()}>
					BFS Algorithm
				</button>
				
				<button onClick={() => this.visualizeDFS()}>
					DFS Algorithm
				</button>

				<div className="grid">
					{grid.map((row, rowIdx) => {
						return (
							<div key={rowIdx}>
								{row.map((node, nodeIdx) => {
									const {
										row,
										col,
										isStart,
										isFinish,
										isWall,
									} = node;
									return (
										<Node
											key={nodeIdx}
											row={row}
											col={col}
											isStart={isStart}
											isFinish={isFinish}
											isWall={isWall}
											mouseIsPressed={mouseIsPressed}
											onMouseDown={(row, col) =>
												this.handleMouseDown(row, col)
											}
											onMouseEnter={(row, col) =>
												this.handleMouseEnter(row, col)
											}
											onMouseUp={() => this.handleMouseUp}
										></Node>
									);
								})}
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

const getInitialGrid = () => {
	const grid = [];

	for (let row = 0; row < 20; row++) {
		const currentRow = [];
		for (let col = 0; col < 50; col++) {
			currentRow.push(createNode(row, col));
		}

		grid.push(currentRow);
	}

	return grid;
};

const createNode = (row, col) => {
	return {
		row,
		col,
		isStart: row === START_NODE_ROW && col === START_NODE_COL,
		isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null,
	};
};

const getNewGridWithWallToggled = (grid, row, col) => {
	const newGrid = grid.slice();
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isWall: !node.isWall,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};
