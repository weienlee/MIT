#include <stdio.h> 
#include <ctype.h>
#include <stdlib.h>

typedef struct node_t {
    struct node_t *left;
    struct node_t *right;
    char value;
} Node;

int main() {

    // get N and M
    int N;
    scanf("%d", &N);
    while(getchar() != '\n'); // digest \n left in buffer

    int i;
    Node *root = malloc(sizeof(*root));
    //printf("%p\n", &root);

    char c, letter;

    // go through N lines
    for (i=0; i<N; i++) {
	Node *current_node = root;
	int received_char = 0;
	// read in characters of each line
	// and construct the encoding tree
	while ((c = getchar()) != '\n') {
	    if (received_char == 0) {
		letter = c;
		received_char = 1;
	    } else {
		if (c=='0') {
		    // go left
		    //printf("LEFT");
		    if (current_node->left != NULL) {
			current_node = current_node->left;
		    } else {
			Node *node = malloc(sizeof(*node));
			//printf("%p\n", node);
			current_node->left = node;
			current_node = node;
		    }
		} else if (c=='1') {
		    // go right
		    //printf("RIGHT");
		    if (current_node->right != NULL) {
			current_node = current_node->right;
		    } else {
			Node *node = malloc(sizeof(*node));
			//printf("%p\n", node);
			current_node->right = node;
			current_node = node;
		    }
		}
	    }

	}
	current_node->value = letter;
	
	//printf("%p\n", current_node);
    }
    
    // decode message
    Node *current_node = root;
    while ((c = getchar()) != '\n') {
	if (c=='0') {
	    if (current_node->left == NULL) {
		printf("%c", current_node->value);
		current_node = root->left;
	    } else {
		current_node = current_node->left;
	    }
	} else {
	    if (current_node->right == NULL) {
		printf("%c", current_node->value);
		current_node = root->right;
	    } else {
		current_node = current_node->right;
	    }
	}
    }
    printf("%c", current_node->value);

}
