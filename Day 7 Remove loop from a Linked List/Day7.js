/* 
Given a linked list of N nodes such that it may contain a loop.

A loop here means that the last node of the linked list is connected to the node at position 
X(1-based index). If the link list does not have any loop, X=0.

Remove the loop from the linked list, if it is present, i.e. unlink the last node which is 
forming the loop.

*/

// Easy and fastest approach to the solution
/* 
    ***Check one by one***
    Use the Floyd's Cycle detection and remove the loop once we have detected the head and the 
    tail of the linked list which is, as well, the one that connects to the start node in the 
    loop  
*/


// Node Class

class Node {
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}


// Floyd's Cycle Detection
const findCycleInLinkedList = (head) => {

    if (!head || !head.next) {
        return false
    }

    //Use the tortoise and hare technique in this code :)
    let tortoise = head
    let hare = tortoise.next

    let loopStartNode = {
        data: null,
        next: null
    }

    while (hare && hare.next) {
        if (hare === tortoise) {
            loopStartNode.data = tortoise.data
            loopStartNode.next = tortoise.next
            return loopStartNode
        }
        tortoise = tortoise.next
        hare = hare.next.next
    }

    return loopStartNode
}


// removing cycle from the linked list

const removeCycleInLinkedList = (head) => {
    let {
        data,
        next
    } = findCycleInLinkedList(head)
    //If no cycle was found in the linked list then end the program
    if (data == null) return
    //This code below is run if cycle was detected
    let currentNode = head
    let tempHead = head
    let k = 1
    while (true) {
        if (currentNode.next.data == data &&
            JSON.stringify(currentNode.next) === JSON.stringify(next)) {
            currentNode.next == null
            break
        }
        currentNode = currentNode.next
        k++
    }
}

// Code for evaluating the program
let head;
    head = new Node(50);
    head.next = new Node(20);
    head.next.next = new Node(15);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(10);

    // Creating a loop for testing
    head.next.next.next.next.next = head.next.next;

    removeCycleInLinkedList(head);