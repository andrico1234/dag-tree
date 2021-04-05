import Dag, { Edge } from "./index";

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

export const getNodes = (data: Roadmap) => data.map((x) => x.id);

export const getEdges = (data: Roadmap) =>
  data
    .map(({ id, parentIds }) => {
      if (!parentIds.length) return null;

      return parentIds.map((parentId) => ({ to: id, from: parentId }));
    })
    .filter((x): x is Edge[] => Boolean(x))
    .reduce((acc, x) => acc.concat(x), []);

const dag = new Dag();

const nodes = getNodes(frontEndRoadmap);
const edges = getEdges(frontEndRoadmap);

dag.addNodes(nodes);
dag.addEdges(edges);
