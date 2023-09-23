def main(board) -> str:
    # lines
    for i in range(3):
        list = board[i]

        if all(element == list[0] for element in list):
            if list[0] == "x": 
                return "player1"
            elif list[0] == "o":
                return "player2"
    
    # columns
    for i in range(3):
        list = [board[0][i], board[1][i], board[2][i]]
        if all(element == list[0] for element in list):
            if list[0] == "x": 
                return "player1"
            elif list[0] == "o":
                return "player2"

    # diagonal
    player1 = 0
    player2 = 0
    for i in range(3):
        if board[i][i] == "x":
            player1 += 1
        elif board[i][i] == "o":
            player2 += 1
    if player1 == 3:
        return "player1"
    elif player2 == 3:
        return "player2"