
#include <bits/stdc++.h>
using namespace std;
struct Edge {
int src, dest, wgt;
};
struct Graph {
int V, E;
vector<Edge> edges;
Graph(int V, int E) : V(V), E(E), edges(E) {}
};
void printArr(const vector<int>& dist) {
cout << "\nVertex Distance from source:\n";
for (int i = 0; i < dist.size(); i++)
cout << i << "\t\t" << dist[i] << "\n";
}
void bellmanFord(const Graph& graph, int src) {
int V = graph.V, E = graph.E;
vector<int> dist(V, INT_MAX);
dist[src] = 0;
for (int i = 1; i < V; i++) {
for (const auto& edge : graph.edges) {
if (dist[edge.src] != INT_MAX && dist[edge.src] + edge.wgt < dist[edge.dest])
dist[edge.dest] = dist[edge.src] + edge.wgt;
}
}
for (const auto& edge : graph.edges) {
if (dist[edge.src] != INT_MAX && dist[edge.src] + edge.wgt < dist[edge.dest]) {
cout << "Graph contains negative weight cycle";
return;
}
}
printArr(dist);
}
int main() {
int V, E;
cout << "Enter number of vertices and edges: ";
cin >> V >> E;
Graph graph(V, E);
for (int i = 0; i < E; i++) {
cout << "Enter edge (src dest wgt): ";
cin >> graph.edges[i].src >> graph.edges[i].dest >> graph.edges[i].wgt;
}
bellmanFord(graph, 0);
return 0;
}
