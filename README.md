# Simple DAG

Simple DAG lets you easilt create your Directed Acyclic Graphs.

## WTF's a DAG?

A DAG is a Directed Acyclic Graph.

This [brief article](https://hazelcast.com/glossary/directed-acyclic-graph/) covers that what and they why succinctly

In short, these are data structures that are
- Graph: A data structure made up of nodes and edges
- Directed: Where each edge connecting a node has an associated direction
- Acyclic: A graph that has no cycles

## Getting started

Install `simple-dag` with `yarn add simple-dag`.

## Example

You can see a DAG in action in the `src/example.ts` file. The file takes an input based on the [frontend developer roadmap](https://roadmap.sh/frontend) and turns it into a DAG.