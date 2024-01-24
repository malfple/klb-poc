#include <bits/stdc++.h>

using namespace std;

int main() {
    string s;
    vector<string> v;
    while(cin>>s) {
        v.push_back(s);
    }
    for(auto x : v) {
        if(x.size() < 3) continue;
        for(auto& c : x) c = tolower(c);
        cout << "\"" << x << "\"," << endl;
    }
}