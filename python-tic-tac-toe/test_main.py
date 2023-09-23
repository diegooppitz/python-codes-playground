import unittest

from main import main

class Test(unittest.TestCase):

    def test_player1_winner_by_col(self):
        board = [["o", "x", "o"],
                 ["o", "x", "#"],
                 ["#", "x", "o"]]
        self.assertEqual("player1", main(board))

    def test_player1_winner_by_row(self):
        board = [["x", "x", "x"],
                ["o", "x", "#"],
                ["o", "#", "o"]]
        self.assertEqual("player1", main(board))


    def test_player2_winner_by_diagonal(self):
        board = [["o", "x", "x"],
                ["o", "o", "#"],
                ["#", "#", "o"]]
        self.assertEqual("player2", main(board))

    def test_player2_winner_by_col(self):
        board = [["o", "x", "#"],
                 ["o", "x", "#"],
                 ["o", "#", "x"]]
        self.assertEqual("player2", main(board))
