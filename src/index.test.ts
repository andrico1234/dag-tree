import Dag, { EdgeToAdd } from "./index";

type Roadmap = Array<{
  id: string;
  parentIds: string[];
}>;

const frontEndRoadmap: Roadmap = [
  {
    id: "html",
    parentIds: [],
  },
  {
    id: "accessibility",
    parentIds: ["html"],
  },
  {
    id: "seo-basics",
    parentIds: ["html"],
  },
  {
    id: "css",
    parentIds: [],
  },
  {
    id: "making-layouts",
    parentIds: ["html", "css"],
  },
  {
    id: "floats",
    parentIds: ["making-layouts"],
  },
  {
    id: "positioning",
    parentIds: ["making-layouts"],
  },
  {
    id: "display",
    parentIds: ["making-layouts"],
  },
];

const getNodes = (data: Roadmap) => data.map((x) => x.id);

const getEdges = (data: Roadmap) =>
  data
    .map(({ id, parentIds }) => {
      if (!parentIds.length) return null;

      return { toName: id, fromNames: parentIds };
    })
    .filter((x): x is EdgeToAdd => Boolean(x));

describe("DAG", () => {
  it("should display a simple DAG", () => {
    const dag = new Dag();

    const nodes = getNodes(frontEndRoadmap);
    const edges = getEdges(frontEndRoadmap);

    dag.addNodes(nodes);
    dag.addEdges(edges);

    expect(dag.nodes).toEqual(nodes);
    expect(dag.edges["making-layouts"].incomingNodes).toEqual(["html", "css"]);
  });

  it("should not duplicate multiple nodes", () => {
    const dag = new Dag();

    const nodes = getNodes(frontEndRoadmap);
    const edges = getEdges(frontEndRoadmap);

    dag.addNodes(nodes);
    dag.addEdges(edges);

    dag.addNode("html");

    expect(dag.nodes.filter((x) => x === "html")).toHaveLength(1);
  });

  it("should not duplicate an edge", () => {
    const dag = new Dag();

    const nodes = getNodes(frontEndRoadmap);
    const edges = getEdges(frontEndRoadmap);

    dag.addNodes(nodes);
    dag.addEdges(edges);

    dag.addEdge("seo-basics", "html");

    expect(
      dag.edges["seo-basics"].incomingNodes.filter((x) => x === "html")
    ).toHaveLength(1);
  });

  it("should throw an error on cycle", () => {
    try {
      const dag = new Dag();

      const nodes = getNodes(frontEndRoadmap);
      const edges = getEdges(frontEndRoadmap);

      dag.addNodes(nodes);
      dag.addEdges(edges);

      dag.addEdge("html", "accessibility");
    } catch (err) {
      expect(err.message).toBe("cycle detected: html <- accessibility <- html");
    }
  });
});
