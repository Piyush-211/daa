#include <iostream>
# include <climits>
using namespace std;

#define INF INT_MAX
#define MAX_V 100 // Maximum number of vertices
#define MAX_E 500 // Maximum number of edges

struct Edge {
    int src, dest, wgt;
};

struct Graph {
    int V, E;
    Edge edges[MAX_E]; // Fixed-size array of edges
};

// Function to print the distance array
void printArr(int dist[], int V) {
    cout << "\nVertex Distance from source:\n";
    for (int i = 0; i < V; i++) {
        cout << i << "\t\t" << dist[i] << "\n";
    }
}

// Bellman-Ford algorithm
void bellmanFord(const Graph& graph, int src) {
    int V = graph.V, E = graph.E;
    int dist[MAX_V]; // Fixed-size array for distances

    // Initialize distances to all vertices as infinity
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
    }
    dist[src] = 0;

    // Relax all edges |V| - 1 times
    for (int i = 1; i < V; i++) {
        for (int j = 0; j < E; j++) {
            int u = graph.edges[j].src;
            int v = graph.edges[j].dest;
            int weight = graph.edges[j].wgt;
            if (dist[u] != INF && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
            }
        }
    }

    // Check for negative-weight cycles
    for (int j = 0; j < E; j++) {
        int u = graph.edges[j].src;
        int v = graph.edges[j].dest;
        int weight = graph.edges[j].wgt;
        if (dist[u] != INF && dist[u] + weight < dist[v]) {
            cout << "Graph contains negative weight cycle";
            return;
        }
    }

    printArr(dist, V);
}

int main() {
    int V, E;
    cout << "Enter number of vertices and edges: ";
    cin >> V >> E;

    Graph graph;
    graph.V = V;
    graph.E = E;

    for (int i = 0; i < E; i++) {
        cout << "Enter edge (src dest wgt): ";
        cin >> graph.edges[i].src >> graph.edges[i].dest >> graph.edges[i].wgt;
    }

    bellmanFord(graph, 0);
    return 0;
}
