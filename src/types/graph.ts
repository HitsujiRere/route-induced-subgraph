export type Node = string | number | symbol;

export type Graph = {
	nodes: Node[];
	edges: Record<Node, Node[]>;
};
