import PriorityQueue from "../utils/PriorityQueue";

function Dijkstra(paths: any[], numberOfVertices: number, numberOfEdges: number, source: number) {
    let i;
    const listOfParent: number[][] = [];
    const adj: [number, number][][] = new Array(numberOfVertices);
    for (i = 0; i < numberOfVertices; i++) {
        adj[i] = [];
    }
    for (i = 0; i < numberOfEdges; i++) {
        const a = paths[i].p1;
        const b = paths[i].p2;
        const w = paths[i].distance;
        adj[a].push([b, w]);
        adj[b].push([a, w]);
    }
    const distance: number[] = new Array(numberOfVertices).fill(Number.MAX_VALUE);
    const parent: number[] = new Array(numberOfVertices);
    const pq = new PriorityQueue<[number, number]>();
    pq.add([0, source]);
    for (i = 0; i < numberOfVertices; i++) {
        parent[i] = i;
    }
    listOfParent.push(JSON.parse(JSON.stringify(parent)));
    distance[source] = 0;
    while (!pq.isEmpty()) {
        const top: [number, number] | null = pq.remove();
        if (top) {
            for (const i of adj[top[1]]) {
                if (top[0] + i[1] < distance[i[0]]) {
                    distance[i[0]] = top[0] + i[1];
                    pq.add([distance[i[0]], i[0]]);
                    parent[i[0]] = top[1];
                    listOfParent.push(JSON.parse(JSON.stringify(parent)));
                }
            }
        }
    }
    const shortestPaths: any[][] = [];
    for (i = 0; i < numberOfVertices; i++) {
        const shortestPath: any[] = [];
        let j = i;
        shortestPath.push({ p1: j, p2: j });
        while (j !== parent[j]) {
            shortestPath.push({ p1: j, p2: parent[j] });
            j = parent[j];
        }
        shortestPaths.push(JSON.parse(JSON.stringify(shortestPath)));
    }
    for (i = 0; i < numberOfVertices; i++) {
        if (distance[i] === Number.MAX_VALUE) {
            distance[i] = -1;
        }
    }
    return { distance: distance, shortestPaths: shortestPaths };
}

export default Dijkstra;