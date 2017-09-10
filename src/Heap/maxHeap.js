class heap {
  constructor(values) {
    this.create(values)
  }

  create(values) {
    this.data = []
    values.forEach((value, index) => {
      this.insert(value, index)
    })
  }

  insert(data, index) {
    index = index === undefined ? this.data.length : index
    let parent = this.parent(index)

    if (parent.index === null || data <= parent.data)
      return (this.data[index] = data)

    this.data[index] = parent.data
    this.insert(data, parent.index)
  }

  extractMax() {
    let max = this.switchMaxAndMin()
    this.compare(0)
    return max
  }

  switchMaxAndMin() {
    let max = this.data.shift()
    this.data.unshift(this.data.pop())
    return max
  }

  compare(index) {
    let maxChild = this.maxChild(this.children(index))
    if (maxChild === null || maxChild.data <= this.data[index]) return

    this.switchNode(index, maxChild)
    this.compare(maxChild.index)
  }

  switchNode(index, child) {
    let data = this.data[index]
    this.data[index] = child.data
    this.data[child.index] = data
  }

  get heap() {
    return this.data
  }

  parent(index) {
    return index === 0
      ? {
          index: null,
          data: null
        }
      : {
          index: ~~((index - 1) / 2),
          data: this.data[~~((index - 1) / 2)]
        }
  }

  children(index) {
    let leftChildIndex = 2 * index + 1
    let rightChildIndex = 2 * index + 2

    let leftChild =
      this.data[leftChildIndex] === undefined
        ? null
        : {
            index: leftChildIndex,
            data: this.data[leftChildIndex]
          }

    let rightChild =
      this.data[rightChildIndex] === undefined
        ? null
        : {
            index: rightChildIndex,
            data: this.data[rightChildIndex]
          }

    return {
      left: leftChild,
      right: rightChild
    }
  }

  maxChild(children) {
    if (children.left === null && children.right === null) return null
    if (children.right === null) return children.left
    return children.left.data > children.right.data
      ? children.left
      : children.right
  }
}

function shuffle(a) {
  let len = a.length
  let shuffled = Array(len)

  for (let i = len; i--; ) {
    let rand = ~~(Math.random() * i)
    shuffled[i] = a[rand]
    a[rand] = a[i]
  }

  return shuffled
}

let values = [20, 13, 9, 8, 5, 3, 7, 6, 2, 1]
let maxHeap = new heap(shuffle(values))

console.log(maxHeap.heap)
maxHeap.insert(42)
console.log(maxHeap.heap)
maxHeap.insert(25)
console.log(maxHeap.heap)

console.log(maxHeap.children(4))
console.log(maxHeap.maxChild(maxHeap.children(4)))

console.log(maxHeap.extractMax())
console.log(maxHeap.heap)

console.log(maxHeap.extractMax())
console.log(maxHeap.heap)

console.log(maxHeap.extractMax())
console.log(maxHeap.heap)
