#include <stdio.h> 
#include <complex.h>
#include <math.h>

int main() {

    // get N and M
    int N, M;
    scanf("%d %d", &N, &M);

    int a, b;
    for (b=0; b<M; b++) {
	for (a=0; a<N; a++) {
	    // calculate c
	    double complex c;
	    c = ((double)a/N * 3.5 - 2.5) + 
		((double)b/M - .5) *  2 * I;

	    // calculate z500
	    double complex z = 0;
	    int i;
	    for (i=1; i<=500; i++) {
		z = z*z + c;
		if (cabs(z) > 2) {
		    printf(" ");
		    break;
		}
	    }
	    if (cabs(z) <= 2) {
		printf("*");
	    }
	}
	printf("\n");
    }

}
