import { describe, expect, it } from "vitest";
import { findAllSimpleEdgePaths } from "./findAllSimpleEdgePaths";
import type { Graph } from "./types/graph";

describe("findAllSimpleEdgePaths", () => {
	it("should find all simple paths in a directed graph", () => {
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

		const paths = findAllSimpleEdgePaths(graph, "s", "t");
		expect(paths).toEqual([
			[
				["s", "a"],
				["a", "t"],
			],
			[
				["s", "b"],
				["b", "t"],
			],
		]);
	});

	it("should return an empty array when no path exists", () => {
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

		const paths = findAllSimpleEdgePaths(graph, "s", "t");
		expect(paths).toEqual([]);
	});

	it("should handle cycles correctly", () => {
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

		const paths = findAllSimpleEdgePaths(graph, "s", "t");
		expect(paths).toEqual([
			[
				["s", "a"],
				["a", "t"],
			],
		]);
	});
});
