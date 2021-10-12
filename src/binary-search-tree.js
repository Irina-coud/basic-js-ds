const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  // указатель на корень, root занят как метод
  node = null;

  root() {
    // возвращаем корень. но т.к. дерево пустое - null;
    return this.node;
  }

  add(data) {
    // создаём новый узел, на случай, если root-null;
    const newNode = new Node(data)
    // проверяем пустой ли корень, если да, то присваиваем значение корню.
    if (!this.node) {
      this.node = newNode;
      return;
    }
    // создаём эту переменную, для того, чтобы относительно неё двигаться по дереву
    // изначально эта переменная - корень. т.к. больше нет элементов
    let currentNode = this.node;
    // заполнение дерева
    while (currentNode) {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left
      }
      else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right
      }
    }
  }

  has(data) {
    let hasNode = this.find(data);

    if (hasNode !== null) {
      return true;
    } else {
      return false;
    }

  }

  find(data) {
    return searchNode(this.node, data);

    function searchNode(node, data) {
      if (!node) {
        return null
      }
      if (node.data === data) {
        return node;
      }

      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data);
    }

  }

  remove(data) {
    this.node = removeNode(this.node, data)

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }


        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.node) {
      return;
    }

    let node = this.node;
    while (node.left) {
      node = node.left
    }

    return node.data

  }

  max() {
    if (!this.node) {
      return;
    }

    let node = this.node;
    while (node.right) {
      node = node.right
    }

    return node.data
  }

}