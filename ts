#include <iostream>
#include <queue>
#include <climits>
#include <algorithm>

using namespace std;

#define INF INT_MAX
#define MAX 10  // Maximum number of cities

// Structure to store a node's details in the state-space tree
struct Node {
    int path[MAX]; // Stores the path taken so far
    int pathLength; // Current length of the path array
    int cost; // Current cost of this path
    int bound; // Bound (lower cost estimate) for completing this path
    int level; // Level of node in the tree
};

// Comparator to order nodes in the priority queue based on bound
struct compare {
    bool operator()(const Node* a, const Node* b) {
        return a->bound > b->bound;
    }
};

// Function to calculate bound for a node (Minimum cost to complete tour from the current node)
int calculateBound(Node* node, int costMatrix[MAX][MAX], int n) {
    int bound = node->cost;
    bool visited[MAX] = {false};

    // Mark cities in the current path as visited
    for (int i = 0; i < node->pathLength; i++) {
        visited[node->path[i]] = true;
    }

    for (int i = 0; i < n; i++) {
        if (!visited[i]) {  // Only for unvisited cities
            int minCost = INF;
            for (int j = 0; j < n; j++) {
                if (i != j && !visited[j]) {
                    minCost = min(minCost, costMatrix[i][j]);
                }
            }
            if (minCost != INF) {
                bound += minCost;
            }
        }
    }
    return bound;
}

// LC Branch and Bound to solve TSP
int tspLCBranchAndBound(int costMatrix[MAX][MAX], int n) {
    priority_queue<Node*, vector<Node*>, compare> pq;
    Node* root = new Node;
    root->path[0] = 0; // Start from city 0
    root->pathLength = 1;
    root->cost = 0;
    root->level = 1;
    root->bound = calculateBound(root, costMatrix, n);
    pq.push(root);

    int minCost = INF;

    while (!pq.empty()) {
        Node* current = pq.top();
        pq.pop();

        if (current->bound < minCost) {
            if (current->level == n) { // Leaf node (all cities visited)
                int lastCity = current->path[current->pathLength - 1];
                int returnCost = costMatrix[lastCity][0];
                if (returnCost != INF && current->cost + returnCost < minCost) {
                    minCost = current->cost + returnCost;
                    current->path[current->pathLength] = 0; // Complete the tour
                    cout << "Path: ";
                    for (int i = 0; i <= current->pathLength; i++) {
                        cout << current->path[i] + 1 << " ";
                    }
                    cout << "\nCost: " << minCost << endl;
                }
            } else { // Intermediate node, generate children
                int lastCity = current->path[current->pathLength - 1];
                for (int i = 0; i < n; i++) {
                    bool alreadyVisited = false;
                    for (int j = 0; j < current->pathLength; j++) {
                        if (current->path[j] == i) {
                            alreadyVisited = true;
                            break;
                        }
                    }
                    if (!alreadyVisited) {
                        Node* child = new Node;
                        for (int j = 0; j < current->pathLength; j++) {
                            child->path[j] = current->path[j];
                        }
                        child->path[current->pathLength] = i;
                        child->pathLength = current->pathLength + 1;
                        child->cost = current->cost + costMatrix[lastCity][i];
                        child->level = current->level + 1;
                        child->bound = calculateBound(child, costMatrix, n);
                        if (child->bound < minCost) {
                            pq.push(child);
                        } else {
                            delete child;
                        }
                    }
                }
            }
        }
        delete current;
    }
    return minCost;
}

int main() {
    int n;
    cout << "Enter number of cities: ";
    cin >> n;

    int costMatrix[MAX][MAX];
    cout << "Enter Cost Matrix (use 999 or a large number for Infinity):\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> costMatrix[i][j];
            if (i != j && costMatrix[i][j] == 0) // Prevent zero costs for non-diagonal elements
                costMatrix[i][j] = INF;
        }
    }

    int result = tspLCBranchAndBound(costMatrix, n);
    cout << "Minimum cost for traveling salesman problem: " << result << endl;

    return 0;
}
