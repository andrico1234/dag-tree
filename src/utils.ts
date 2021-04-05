import { Edge } from ".";

export type Roadmap = Array<{
  id: string;
  parentIds: string[];
}>;

export const getNodes = (data: Roadmap) => data.map((x) => x.id);

export const getEdges = (data: Roadmap) =>
  data
    .map(({ id, parentIds }) => {
      if (!parentIds.length) return null;

      return parentIds.map((parentId) => ({ to: id, from: parentId }));
    })
    .filter((x): x is Edge[] => Boolean(x))
    .reduce((acc, x) => acc.concat(x), []);
