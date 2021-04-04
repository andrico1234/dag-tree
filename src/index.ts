const keys = [
  { id: "plank", parentIds: [] },
  { id: "incline-push-up", parentIds: [] },
  {
    id: "push-up",
    parentIds: ["incline-push-up", "plank"],
  },
  { id: "diamond-push-up", parentIds: ["push-up"] },
  {
    id: "pseudo-planche-push-up",
    parentIds: ["diamond-push-up"],
  },
  {
    id: "pike-push-up",
    parentIds: ["pseudo-planche-push-up"],
  },
  { id: "archer-push-up", parentIds: ["pike-push-up"] },
  {
    id: "rto-push-up",
    parentIds: ["diamond-push-up"],
  },
];

interface Edge {
  node: string;
  incomingNodes: string[];
  hasOutgoing: boolean;
}

type Callback = (edge: Edge, path: string[]) => void;
type Edges = Record<string, Edge>;

interface EdgeToAdd {
  toName: string;
  fromNames: string[];
}

class DAG {
  nodes: string[];
  edges: Edges;

  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode = (node: string) => {
    if (this.edges[node]) {
      return this.edges[node];
    }

    const edge: Edge = {
      node,
      incomingNodes: [],
      hasOutgoing: false,
    };

    this.edges[node] = edge;
    this.nodes.push(node);
    return edge;
  };

  addNodes = (nodes: string[]) => {
    const res = nodes.map(this.addNode);
    return res;
  };

  addEdge = (toName: string, fromName: string) => {
    if (toName === fromName) return null;

    const to = this.addNode(toName);
    const from = this.addNode(fromName);

    if (to.incomingNodes.includes(fromName)) {
      return null;
    }

    function checkCycle(edge: Edge, path: string[]) {
      if (edge.node === toName) {
        throw new Error(
          "cycle detected: " + toName + " <- " + path.join(" <- ")
        );
      }
    }

    this.visit(from, checkCycle);

    to.incomingNodes.push(fromName);
    from.hasOutgoing = true;
  };

  addEdges = (edges: EdgeToAdd[]) => {
    const res = edges.map(({ toName, fromNames }) => {
      return fromNames.map((fromName) => {
        return this.addEdge(toName, fromName);
      });
    });

    return res;
  };

  visit = (
    edge: Edge,
    fn: Callback,
    visited: Record<string, boolean> = {},
    path: string[] = []
  ) => {
    const node = edge.node;
    const nodes = edge.incomingNodes;

    const edges: Edges = nodes.reduce(
      (acc, node) => ({ ...acc, [node]: this.edges[node] }),
      {}
    );

    const len = nodes.length;

    if (visited.hasOwnProperty(node)) {
      return;
    }

    path.push(node);
    visited[node] = true;

    for (let i = 0; i < len; i++) {
      this.visit(edges[nodes[i]], fn, visited, path);
    }

    fn(edge, path);
    path.pop();
  };
}

export default DAG;

const skillTreeDAG = new DAG();

const nodes = keys.map(({ id }) => id);
const edges = keys
  .map(({ id, parentIds }) => {
    if (!parentIds.length) return null;

    return { toName: id, fromNames: parentIds };
  })
  .filter((x): x is EdgeToAdd => Boolean(x));

skillTreeDAG.addNodes(nodes);
skillTreeDAG.addEdges(edges);

console.log(skillTreeDAG.edges);
