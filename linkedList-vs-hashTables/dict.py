# Creating an empty dictionary
my_dictionary = {}

# Adding elements to the dictionary
my_dictionary['key1'] = 'value1'
my_dictionary['key2'] = 'value2'
my_dictionary['key3'] = 'value3'

# Accessing dictionary elements
print(my_dictionary['key2'])

# Removing an element
del my_dictionary['key3']

# clear all elements
my_dictionary.clear()

# Iterating over the dictionary keys
for key in my_dictionary:
    value = my_dictionary[key]
    print(f'Key: {key}, Value: {value}')