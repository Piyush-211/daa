#include <iostream>
#include <vector>
using namespace std;
#define INF 999
int n, cost = 0;
vector<vector<int>> costMatrix;
vector<bool> visited;
void TSP(int city) {
visited[city] = true;
cout << city + 1 << " --> ";
int nextCity = INF, minCost = INF;
for (int i = 0; i < n; ++i)
if (!visited[i] && costMatrix[city][i] && costMatrix[city][i] < minCost)
minCost = costMatrix[city][i], nextCity = i;
if (nextCity == INF) {
cout << "1";
cost += costMatrix[city][0];
} else {
cost += minCost;
TSP(nextCity);
}
}
int main() {
cout << "Enter number of cities: ";
cin >> n;
// Resize the costMatrix and visited vectors
costMatrix.resize(n, vector<int>(n));
visited.resize(n, false);
cout << "Enter Cost Matrix (0 for Infinity):\n";
// Use traditional for loops to read the cost matrix
for (int i = 0; i < n; ++i) {
for (int j = 0; j < n; ++j) {
cin >> costMatrix[i][j];
}
}
cout << "\nThe Best Path is:\n";
TSP(0);
cout << "\nMinimum Cost: " << cost << endl;
return 0;
}
