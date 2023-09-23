def checkCheaperProduct(products):
    return min(products.values())

def calcDiscount(cheaper, length):
    return cheaper / length

def calcPercentage(discount, value):
    percentage = (discount / value) * 100
    return round(percentage, 2)

def calcFinalValue(products):
    arrayLength = len(products)
    cheaper = checkCheaperProduct(products)
    discount = calcDiscount(cheaper, arrayLength)
    finalList = []

    for key, value in products.items():
        percentage = str(calcPercentage(discount, value)) + "%"
        obj = { "name": key, "Final Value": value - discount, "discount %":  percentage, "discount": discount }
        finalList.append(obj)
    print(finalList)
    return finalList

def main(products):
    calcFinalValue(products)


    
products = {"Shirt T": 50, "Socks Y": 30, "Jacket M": 80}
main(products)