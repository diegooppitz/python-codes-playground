class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }

  insert(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    this.table[index].push({ key, value });
  }

  // pull key value
  get(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return undefined;
    }
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        return this.table[index][i].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return undefined;
    }
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        const removedValue = this.table[index][i].value;
        this.table[index].splice(i, 1);
        return removedValue;
      }
    }
    return undefined;
  }
}

const hashTable = new HashTable(10);

hashTable.insert("apple", "red");
hashTable.insert("banana", "yellow");
hashTable.insert("grape", "purple");

console.log(hashTable.get("apple"));
console.log(hashTable.get("banana"));
console.log(hashTable.get("grape"));

hashTable.remove("banana");
console.log(hashTable.get("banana"));