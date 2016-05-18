#include <iostream>
#include <cmath>
using namespace std;


// returns int array with hashed digits
int * credit_hash(char digits[], int size) {
    int *hashed = new int[size];
    int i, digit;
    for (i=0; i<size; i++) {
	digit = digits[i] - '0';
	hashed[i] = ((digit + pow(i,4) + pow((size - i), 4)) * pow(size, 2)) / pow((size-3), 2);
    }
    return hashed;
}

int main() {
    int N, M, D;
    
    cin >> N >> M >> D;
    int i, j, k;

    
    char *credit_cards[M];
    int *hashes[M];


    // for each credit card number
    // store number and hash value
    for (i=0; i<M; i++) {
	char *digits = new char[D];
	cin >> digits;
	credit_cards[i] = digits;

	int *hashed;
	hashed = credit_hash(digits, D);
	hashes[i] = hashed;
    }

    // go through each hash
    for (i=0; i<N; i++) {
	int hashed[D];
	for (j=0; j<D; j++) {
	    cin >> hashed[j];
	}
	
	// go through stored hashes and
	// output credit card # if match
	for (j=0; j<M; j++) {
	    int match = 1;
	    for (k=0; k<D; k++) {
		if (hashed[k] != hashes[j][k]) {
		    match = 0;
		}
	    }
	    if (match == 1) {
		cout << credit_cards[j] << "\n";
	    }	    
	}
    }

    // cleanup
    for (i=0; i<M; i++) {
	delete[] hashes[i];
	delete[] credit_cards[i];
    }

    return 0;
}
