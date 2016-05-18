#include <iostream>
using namespace std;

int main() {
    int N, M, L;
    int B, R; // # of bulls in the race, # of laps
    long K; // label
    int i, j, k; // counters
    long fastest_label;
    double fastest_speed;

    cin >> N >> M >> L;
    //int times [L];
    
    // loop through races
    for (i=0; i<N; i++) {
	cin >> B >> R;

	// loop through bulls in given race
	for (j=0; j<B; j++) {
	    
	    cin >> K; // label
	    long time = 0;
	    
	    // loop through laps for given bull
	    for (k=0; k<R; k++) {
		long lap_time;
		cin >> lap_time;
		time += lap_time;
	    }

	    // calculate speed
	    long distance = R*(10+j)*M;
	    double speed = (double) distance / time;
	    
	    /* debug
	    cout << "time: " << time << "\n";
	    cout << "distance: " << distance << "\n";
	    cout << "speed: " << speed << "\n";
	    */

	    // update fastest
	    if (!fastest_label) {
		fastest_label = K;
		fastest_speed = speed;
	    } else if (speed > fastest_speed) {
		fastest_label = K;
		fastest_speed = speed;
	    }
	}

    }
    cout << fastest_label;
    return 0;
}
