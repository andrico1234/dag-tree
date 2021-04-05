export interface Edge {
  to: string;
  from: string;
}

export type Callback = (edge: Edge, path: string[]) => void;
export type Edges = Record<string, Edge>;

class DAG {
  nodes: string[];
  edges: Edge[];

  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  private visit = (
    edge: Edge,
    fn: Callback,
    visited: Record<string, boolean> = {},
    path: string[] = []
  ) => {
    const node = edge.from;
    const edges = this.edges.filter(({ from }) => from === edge.to);
    const len = edges.length;

    console.log(this.edges);

    if (visited.hasOwnProperty(node)) {
      return;
    }

    path.push(node);
    visited[node] = true;

    for (let i = 0; i < len; i++) {
      this.visit(edges[i], fn, visited, path);
    }

    fn(edge, path);
    path.pop();
  };

  private checkEdgeExists = (to: string, from: string) => {
    const edges = this.edges;

    return edges.some((edge) => edge.to === to && edge.from === from);
  };

  addNode = (node: string) => {
    if (this.nodes.includes(node)) {
      return node;
    }

    this.nodes.push(node);
    return node;
  };

  addNodes = (nodes: string[]) => {
    const res = nodes.map(this.addNode);
    return res;
  };

  addEdge = (toName: string, fromName: string) => {
    if (toName === fromName) return null;

    const to = this.addNode(toName);
    const from = this.addNode(fromName);

    if (this.checkEdgeExists(to, from)) {
      return null;
    }

    function checkCycle(edge: Edge, path: string[]) {
      if (edge.from === toName) {
        throw new Error(
          "cycle detected: " + toName + " <- " + path.join(" <- ")
        );
      }
    }

    const newEdge = { to, from };

    this.visit(newEdge, checkCycle);
    this.edges.push(newEdge);
  };

  addEdges = (edges: Edge[]) => {
    const res = edges.map(({ to, from }) => {
      return this.addEdge(to, from);
    });

    return res;
  };

  getEdgesFromNodeId = (fromNodeId: string) => {
    return this.edges.filter((edge) => edge.from === fromNodeId);
  };
}

export default DAG;
