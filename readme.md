# Dijkstra

Shortest path finder with Dijkstra Algorithm

Dijkstra is a shortest path finder and visualizer web application which uses the Dijkstra's Algorithm and Haversine Distance to calculate the shortest paths in the geographic coordinate system.

## Features:
- Get shortest distance between provided geographic coordinates.
 - Use Map to select your desired geographic coordinates or enter the coordinates manually.
 - Beautiful animation while changing destination coordinates.

# What is Dijkstra's Algorithm?

Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a weighted graph. Particularly, with Dijkstra's Algorithm we can find the shortest path from a node (called the "source node") to all other nodes in the graph, producing a shortest-path tree.

## Basics of Dijkstra's Algorithm
- Dijkstra's Algorithm basically starts at the node that you choose (the source node) and it analyzes the graph to find the shortest path between that node and all the other nodes in the graph.
 - The algorithm keeps track of the currently known shortest distance from each node to the source node and it updates these values if it finds a shorter path.
 - Once the algorithm has found the shortest path between the source node and another node, that node is marked as "visited" and added to the path.
 - The process continues until all the nodes in the graph have been added to the path. This way, we have a path that connects the source node to all other nodes following the shortest path possible to reach each node.

# Integration with Leaflet

Leaflet is an open source JavaScript library used to build web mapping applications.

With the integration with Leaflet, it is possible to select a coordinate from the map directly, we can also search for a place in the map to select the coordinates of that particular place.

# Use of D3

D3 (also known as D3.js) is a JavaScript library for producing dynamic, interactive data visualizations in web browsers.

Dijkstra uses D3 library to plot the provided coordinates for the visualizations and easy-view.

# Preview
<img src="/preview/preview_1.png" width="400"> <img src="/preview/preview_2.png" width="400">
<img src="/preview/preview_3.png" width="400"> <img src="/preview/preview_4.png" width="400">

## Deployment

To deploy this project

Open terminal and navigate to dijkstra

```bash
  cd dijkstra
```

Install packages

```bash
  npm install
```

Start the App

```bash
  npm start
```

## Tech Stack

React.ts, D3.js, Leaflet

## Created by
- [Subrat Pandey](https://github.com/imsubratpandey)
- [Archana Yadav](https://github.com/archanay1203)