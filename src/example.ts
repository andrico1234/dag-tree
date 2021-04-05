import Dag, { Edge } from "./index";
import { getEdges, getNodes, Roadmap } from "./utils";

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

const dag = new Dag();

const nodes = getNodes(frontEndRoadmap);
const edges = getEdges(frontEndRoadmap);

dag.addNodes(nodes);
dag.addEdges(edges);
