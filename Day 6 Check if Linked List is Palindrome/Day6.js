/* 
CHECK IF A LINKED LIST IS PALINDROME

Given a singly linked list of size N of integers. The task is to check if the given linked list is palindrome or not.

The task is to complete the function isPalindrome() which takes head as reference as the only parameter and returns
true or false if linked list is palindrome or not respectively.
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

const isPalindrome = (head) => {
    let stack = []; // a stack to save data individually from the linked list node's data 
    let currentNode = head; // the node we are currently working on

    while (true) { // until a break is found
        stack.push(currentNode.data); // save every node's data in the stack

        if (currentNode.next != null) currentNode = currentNode.next //keep saving until the tail node is found
        else break
    }

    currentNode = head;
    while(stack.length > 0){
        if(stack.pop() !== currentNode.data){ // if last element of the stack doesn't 
                                             // match nth node's data
            return false
        }
        currentNode = currentNode.next // traverse the linked list and keep comparing
    }

    return true
}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(1);

node1.next = node2;
node2.next = node3;

let head = node1;
isPalindrome(head);