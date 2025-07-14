import type { Graph, Node } from "./types/graph";

type Edge = [Node, Node];
type Path = Edge[];

export const findAllSimpleEdgePaths = (
	graph: Graph,
	source: Node,
	sink: Node,
): Path[] => {
	const currentPath: Path = [];
	const visited = new Set<Node>();
	const paths: Path[] = [];

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
