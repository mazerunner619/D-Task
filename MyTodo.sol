// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract MyTodo{

    struct Todo{
        uint256 id;
        string description;
        string deadline;
        bool done;
    }

    mapping (address => Todo[]) private todos;

    modifier validIndex(uint index){
        require(index < todos[msg.sender].length, "invalid index");
        _;
    }

    function deleteTask(uint index) public validIndex(index) returns(bool success){
        uint lastIndex = todos[msg.sender].length-1;
        todos[msg.sender][index] = todos[msg.sender][lastIndex];
        todos[msg.sender].pop();
        return true;
    }

    function createTask(string memory description, string memory deadline) public returns(bool success){
        todos[msg.sender].push(Todo(block.timestamp, description, deadline, false));
        return true;
    }

    function getTaskByIndex(uint256 index) public view validIndex(index) returns(Todo memory data){
        return todos[msg.sender][index];
    }

    function updateTask(uint index, string memory description, string memory deadline, bool done) public validIndex(index) returns(bool success){
        Todo memory oldTodo = todos[msg.sender][index];
        todos[msg.sender][index] = Todo(oldTodo.id, description, deadline, done);
        return true;
    }

    function getAllTasks() public view returns(Todo[] memory data){
        return todos[msg.sender];
    }
}