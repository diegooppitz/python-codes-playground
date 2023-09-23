class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]  # Empty list of lists to store key-value pairs.

    def _hash(self, key):
        return sum(ord(c) for c in key) % self.size

    def put(self, key, value):
        index = self._hash(key)
        for kvp in self.table[index]:
            if kvp[0] == key:
                kvp[1] = value
                return
        self.table[index].append([key, value])

    def get(self, key):
        index = self._hash(key)
        for kvp in self.table[index]:
            if kvp[0] == key:
                return kvp[1]

    def remove(self, key):
        index = self._hash(key)
        for kvp in self.table[index]:
            if kvp[0] == key:
                self.table[index].remove(kvp)
                return

# use example:
hash_table = HashTable(10)
hash_table.put("key1", "valor1")
hash_table.put("key2", "valor2")
hash_table.put("key3", "valor3")

print(hash_table.get("key1"))
print(hash_table.get("key2"))
print(hash_table.get("key3"))

hash_table.put("key2", "novo_valor")
print(hash_table.get("key2")) 

hash_table.remove("key2")
print(hash_table.get("key2"))
