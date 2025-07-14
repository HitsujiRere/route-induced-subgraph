import { findAllSimpleEdgePaths } from "./findAllSimpleEdgePaths";
import type { Graph, Node } from "./types/graph";

export const induceByRouteSubgraph = (
	graph: Graph,
	source: Node,
	sink: Node,
): Graph => {
	const paths = findAllSimpleEdgePaths(graph, source, sink);

	const nodes = new Set(paths.flat(2));
	const edges = new Set(paths.flat().map((edge) => JSON.stringify(edge)));

	return {
		nodes: graph.nodes.filter((node) => nodes.has(node)),
		edges: Object.fromEntries(
			Object.entries(graph.edges)
				.map<[Node, Node[]]>(([fromNode, toNodes]) => [
					fromNode,
					toNodes.filter((toNode) =>
						edges.has(JSON.stringify([fromNode, toNode])),
					),
				])
				.filter(([_, toNodes]) => toNodes.length > 0),
		),
	};
};
