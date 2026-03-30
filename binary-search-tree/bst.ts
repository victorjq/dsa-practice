/**
 * Node class represents a single node in the BST
 */
class Node {
    value: number;
    left: Node | null;
    right: Node | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


/**
 * Binary Search Tree implementation
 */
class BST {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    /**
     * Insert a value into the BST
     * @param value - The number to insert
     */
    insert(value: number): void {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let current: Node = this.root;

        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new Node(value);
                    return;
                }
                current = current.right;
            }
        }
    }

    /**
     * Remove a value from the BST
     * @param value - The number to remove
     */
    remove(value: number): void {
        this.root = this.removeNode(this.root, value);
    }

    /**
     * Helper method to recursively remove a node
     */
    private removeNode(node: Node | null, value: number): Node | null {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
        } else {
            // Node to remove found
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            // Find minimum value in right subtree (in-order successor)
            let min: Node = node.right;
            while (min.left !== null) {
                min = min.left;
            }
            node.value = min.value;
            node.right = this.removeNode(node.right, min.value);
        }

        return node;
    }

    /**
     * Find the minimum value in the BST
     * @returns The minimum value
     * @throws Error if tree is empty
     */
    findMin(): number {
        if (this.root === null) {
            throw new Error("Tree is empty");
        }

        let current: Node = this.root;

        while (current.left !== null) {
            current = current.left;
        }

        return current.value;
    }
    
  
    /**
     * Find the maximum value in the BST
     * @returns The maximum value
     * @throws Error if tree is empty
     */
    findMax(): number {
        if (this.root === null) {
            throw new Error("Tree is empty");
        }

        let current: Node = this.root;

        while (current.right !== null) {
            current = current.right;
        }

        return current.value;
    }

    /**
     * Search for a value in the BST
     * @param value - The number to search for
     * @returns true if value exists, false otherwise
     */
    search(value: number): boolean {
        let current: Node | null = this.root;

        while (current !== null) {
            if (current.value === value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    /**
     * Calculate the height of the tree
     * @param node - The node to start from (defaults to root)
     * @returns The height of the tree
     */
    height(node: Node | null = this.root): number {
        if (node === null) {
            return 0;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Get the total number of nodes in the tree
     * @returns The number of nodes
     */
    size(node: Node | null = this.root): number {
        if (node === null) {
            return 0;
        }

        return 1 + this.size(node.left) + this.size(node.right);
    }

    /**
     * In-order traversal (Left, Root, Right) - returns sorted array
     * @returns Array of values in sorted order
     */
    inorder(node: Node | null = this.root, result: number[] = []): number[] {
        if (node !== null) {
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
        }
        return result;
    }

    /**
     * Pre-order traversal (Root, Left, Right)
     * @returns Array of values in pre-order
     */
    preorder(node: Node | null = this.root, result: number[] = []): number[] {
        if (node !== null) {
            result.push(node.value);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
        }
        return result;
    }

    /**
     * Post-order traversal (Left, Right, Root)
     * @returns Array of values in post-order
     */
    postorder(node: Node | null = this.root, result: number[] = []): number[] {
        if (node !== null) {
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.value);
        }
        return result;
    }

    /**
     * Check if the tree is a valid BST
     * @returns true if valid BST, false otherwise
     */
    isValidBST(): boolean {
        return this.isValidBSTHelper(this.root, null, null);
    }

    /**
     * Helper method to validate BST property
     */
    private isValidBSTHelper(node: Node | null, min: number | null, max: number | null): boolean {
        if (node === null) {
            return true;
        }

        if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) {
            return false;
        }

        return (
            this.isValidBSTHelper(node.left, min, node.value) &&
            this.isValidBSTHelper(node.right, node.value, max)
        );
    }

    /**
     * Check if the tree is balanced
     * @returns true if balanced, false otherwise
     */
    isBalanced(): boolean {
        return this.getBalancedHeight(this.root) !== -1;
    }

    /**
     * Helper method to check if tree is balanced
     * Returns -1 if unbalanced, otherwise returns height
     */
    private getBalancedHeight(node: Node | null): number {
        if (node === null) {
            return 0;
        }

        const leftHeight = this.getBalancedHeight(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = this.getBalancedHeight(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }
}

// ============================================
// TEST SUITE
// ============================================

console.log("===== BST TEST SUITE =====");

const bst = new BST();

// Test 1: Insert values
console.log("\n1. Testing INSERT:");
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);
console.log("✓ Inserted: 50, 30, 70, 20, 40, 60, 80");

// Test 2: Search
console.log("\n2. Testing SEARCH:");
console.log("Search 40:", bst.search(40) ? "✓ Found" : "✗ Not found");
console.log("Search 100:", !bst.search(100) ? "✓ Not found (correct)" : "✗ Found (incorrect)");

// Test 3: FindMin and FindMax
console.log("\n3. Testing FINDMIN and FINDMAX:");
console.log("Min value:", bst.findMin() === 20 ? "✓ 20" : "✗ Wrong");
console.log("Max value:", bst.findMax() === 80 ? "✓ 80" : "✗ Wrong");

// Test 4: Height
console.log("\n4. Testing HEIGHT:");
console.log("Tree height:", bst.height() === 3 ? "✓ 3" : `✗ ${bst.height()}`);

// Test 5: Size
console.log("\n5. Testing SIZE:");
console.log("Tree size:", bst.size() === 7 ? "✓ 7" : `✗ ${bst.size()}`);

// Test 6: Traversals
console.log("\n6. Testing TRAVERSALS:");
console.log("In-order (sorted):", bst.inorder());
console.log("Pre-order:", bst.preorder());
console.log("Post-order:", bst.postorder());

// Test 7: Valid BST
console.log("\n7. Testing ISVALIDBST:");
console.log("Is valid BST:", bst.isValidBST() ? "✓ Yes" : "✗ No");

// Test 8: Balanced check
console.log("\n8. Testing ISBALANCED:");
console.log("Is balanced:", bst.isBalanced() ? "✓ Yes" : "✗ No");

// Test 9: Remove
console.log("\n9. Testing REMOVE:");
console.log("Before remove - Search 20:", bst.search(20) ? "Found" : "Not found");
bst.remove(20);
console.log("After remove 20 - Search 20:", !bst.search(20) ? "✓ Not found (correct)" : "✗ Still found");
console.log("New size:", bst.size() === 6 ? "✓ 6" : `✗ ${bst.size()}`);

// Test 10: Remove node with two children
console.log("\n10. Testing REMOVE (node with two children):");
console.log("Before remove - In-order:", bst.inorder());
bst.remove(30); // This has two children (20 was already removed, but 40 exists)
console.log("After remove 30 - In-order:", bst.inorder());
console.log("✓ In-order still sorted:", JSON.stringify(bst.inorder()) === JSON.stringify([40, 50, 60, 70, 80]));

// Test 11: Error handling
console.log("\n11. Testing ERROR HANDLING:");
const emptyBST = new BST();
try {
    emptyBST.findMin();
    console.log("✗ Should have thrown error");
} catch (e) {
    console.log("✓ Correctly threw error for empty tree:", (e as Error).message);
}

console.log("\n===== ALL TESTS COMPLETED =====");