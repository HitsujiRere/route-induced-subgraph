import type { Graph, Node } from "./types/graph";

export type Edge = [Node, Node];
export type EdgePath = Edge[];

export const findAllSimpleEdgePaths = (
	graph: Graph,
	source: Node,
	sink: Node,
): EdgePath[] => {
	const currentPath: EdgePath = [];
	const visited = new Set<Node>();
	const paths: EdgePath[] = [];

	const dfs = (currentNode: Node) => {
		visited.add(currentNode);

		if (currentNode === sink) {
			paths.push([...currentPath]);
		} else {
			for (const nextNode of graph.edges[currentNode]) {
				if (!visited.has(nextNode)) {
					currentPath.push([currentNode, nextNode]);
					dfs(nextNode);
				}
			}
		}

		currentPath.pop();
		visited.delete(currentNode);
	};

	dfs(source);
	return paths;
};
