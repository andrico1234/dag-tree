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

const dag = new Dag();

const nodes = getNodes(frontEndRoadmap);
const edges = getEdges(frontEndRoadmap);

dag.addNodes(nodes);
dag.addEdges(edges);

console.log(dag.nodes);
console.log(dag.edges["making-layouts"].incomingNodes);
