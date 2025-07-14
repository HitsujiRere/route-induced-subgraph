import { describe, expect, it } from "vitest";
import { induceByRouteSubgraph } from "./induceByRouteSubgraph";
import type { Graph } from "./types/graph";

describe("induceByRouteSubgraph", () => {
	it("should return the original graph when all nodes and edges are on a path from source to sink", () => {
		/*
			s─┬►a─┬►t
			  └►b─┘  
		 */
		const graph: Graph = {
			nodes: ["s", "t", "a", "b"],
			edges: {
				s: ["a", "b"],
				a: ["t"],
				b: ["t"],
			},
		};

		const rigraph = induceByRouteSubgraph(graph, "s", "t");
		expect(rigraph).toEqual({
			nodes: ["s", "t", "a", "b"],
			edges: {
				s: ["a", "b"],
				a: ["t"],
				b: ["t"],
			},
		} satisfies Graph);
	});

	it("should return an empty graph if no path exists from source to sink", () => {
		/*
			s──►a ┌►t
			    b─┘
		 */
		const graph: Graph = {
			nodes: ["s", "t", "a", "b"],
			edges: {
				s: ["a"],
				a: [],
				b: ["t"],
			},
		};

		const rigraph = induceByRouteSubgraph(graph, "s", "t");
		expect(rigraph).toEqual({
			nodes: [],
			edges: {},
		} satisfies Graph);
	});

	it("should remove nodes and edges not on a path from source to sink", () => {
		/*
			s─┬►a─┬►t
			 └─b◄┘ 
		 */
		const graph: Graph = {
			nodes: ["s", "t", "a", "b"],
			edges: {
				s: ["a"],
				a: ["b", "t"],
				b: ["a"],
			},
		};

		const rigraph = induceByRouteSubgraph(graph, "s", "t");
		expect(rigraph).toEqual({
			nodes: ["s", "t", "a"],
			edges: {
				s: ["a"],
				a: ["t"],
			},
		} satisfies Graph);
	});
});