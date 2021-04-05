import Dag from "./index";
import { getNodes, getEdges } from "./utils";

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

describe("DAG", () => {
  it("should display a simple DAG", () => {
    const dag = new Dag();

    const nodes = getNodes(frontEndRoadmap);
    const edges = getEdges(frontEndRoadmap);

    dag.addNodes(nodes);
    dag.addEdges(edges);

    expect(dag.nodes).toEqual(nodes);

    const makingLayoutsEdges = dag.getEdgesFromNodeId("making-layouts");

    expect(makingLayoutsEdges).toEqual([
      { from: "making-layouts", to: "floats" },
      { from: "making-layouts", to: "positioning" },
      { from: "making-layouts", to: "display" },
    ]);
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

    const htmlEdges = dag.getEdgesFromNodeId("html");

    expect(htmlEdges).toEqual([
      { to: "accessibility", from: "html" },
      { to: "seo-basics", from: "html" },
      { to: "making-layouts", from: "html" },
    ]);
  });

  it("should throw an error on cycle", () => {
    try {
      expect.assertions(1);

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

  it("should throw an error on a depper cycle", () => {
    try {
      expect.assertions(1);

      const dag = new Dag();

      const nodes = getNodes(frontEndRoadmap);
      const edges = getEdges(frontEndRoadmap);

      dag.addNodes(nodes);
      dag.addEdges(edges);

      dag.addEdge("html", "positioning");
    } catch (err) {
      expect(err.message).toBe("cycle detected: html <- positioning <- html");
    }
  });
});
