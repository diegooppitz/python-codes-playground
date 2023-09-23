class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def add_node(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def get_node_by_value(self, value):
        current = self.head
        while current:
            if current.data == value:
                return current
            current = current.next
        return None

# Exemplo de uso
linked_list = LinkedList()

# Adicionando nós à lista
linked_list.add_node("A")
linked_list.add_node("B")
linked_list.add_node("C")
linked_list.add_node("D")

# Acessando um nó específico com referência direta
node = linked_list.get_node_by_value("B")
print(node.data)  # Saída: B