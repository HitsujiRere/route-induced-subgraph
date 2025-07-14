# Route-induced Subgraph

経路誘導部分グラフ(Route-Induced Subgraph)，つまりすべての単純な始点終点パスによって誘導される部分グラフを計算するライブラリです。

## 使い方

以下は、`induceByRouteSubgraph` 関数を使用して誘導部分グラフを生成する基本的な例です。

```typescript
import { induceByRouteSubgraph, type Graph } from "route-induced-subgraph";

// グラフを定義します
const graph: Graph = {
  nodes: ["A", "B", "C", "D", "E"],
  edges: {
    "A": ["B", "C"],
    "B": ["C"],
    "C": ["D", "E"],
    "D": ["B"],
    "E": ["A"],
  },
};

// 始点 "A" から終点 "E" への経路によって誘導される部分グラフを計算します
const sourceNode = "A";
const sinkNode = "E";

const inducedSubgraph = induceByRouteSubgraph(graph, sourceNode, sinkNode);

console.log(inducedSubgraph);
/*
{
  nodes: [ "A", "B", "C", "E" ],
  edges: { 
    "A": ["B", "C"],
    "B": ["C"],
    "C": ["E"],
    "E": ["A"],
  }
}
*/
```

## API

### `induceByRouteSubgraph(graph: Graph, source: Node, sink: Node): Graph`

始点 (`source`) から終点 (`sink`) までのすべての単純な経路に基づいて、誘導部分グラフを生成します。

-   `graph`: `Graph` オブジェクト。
-   `source`: 始点となる `Node`。
-   `sink`: 終点となる `Node`。
-   戻り値: 誘導された新しい `Graph` オブジェクト。

## ライセンス

[MIT](./LICENSE)
