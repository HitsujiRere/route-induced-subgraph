import type { Graph, Node } from "./types/graph";
import type { Path } from "./types/path";

export const findAllSimplePaths = (
	graph: Graph,
	source: Node,
	sink: Node,
): Path[] => {
	const currentPath: Path = [];
	const visited = new Set<Node>();
	const paths: Path[] = [];

	const dfs = (currentNode: Node) => {
		currentPath.push(currentNode);
		visited.add(currentNode);

		if (currentNode === sink) {
			paths.push([...currentPath]);
		} else {
			for (const nextNode of graph.edges[currentNode]) {
				if (!visited.has(nextNode)) {
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
