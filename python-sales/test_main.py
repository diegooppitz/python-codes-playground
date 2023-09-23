import unittest

from main import checkCheaperProduct, calcDiscount, calcPercentage, calcFinalValue


class Test(unittest.TestCase):
    products = {"Shirt T": 50, "Socks Y": 30, "Jacket M": 80}

    def test_checkCheaperProduct(self):
        assert 30 == checkCheaperProduct(self.products)

    def test_checkDiscount(self):
        assert 10 == calcDiscount(30, 3)

    def test_checkPercentage(self):
        assert 70 == calcPercentage(70, 100)

    # def test_result(self):
    #     list_products = {"Shirt T": 50, "Socks Y": 30}
    #     assert [{'name': 'Shirt T', 'Final Value': 40.0, 'discount %': '20.0%', 'discount': 10.0}, {'name': 'Socks Y', 'Final Value': 20.0, 'discount %': '33.33%', 'discount': 10.0}] == calcFinalValue(list_products)
