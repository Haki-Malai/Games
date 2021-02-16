import time
import random

over = False

while over == False:
    user_points = 0
    AI_points = 0
    print('\033[H\033[J')
    print(50*'_')
    print('|                                                |')
    print('|          ~Rock-Paper-Scissors~                 |')
    print('|',(46*'_'),'|')

    time.sleep(1)
    print('\033[H\033[J')         #clear screen#
    print(50*'_')
    print('|                                                |')
    print('|                  ~Welcome!                     |')
    print('|',(46*'_'),'|')
    while user_points < 3 and AI_points < 3:
        troll = True
        while troll == True:
            time.sleep(1)
            print('\033[H\033[J')       #clear screen#
            print(50*'_'+'\n'+'|               Please choose!                   |')
            choice = input('|R for Rock, P for Paper or S for Scissors!      |\n|'+(48*'_')+'|')
            if choice == 'R' or choice == 'P' or choice == 'S':
                troll = False
            else:
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|          Please give a valid choice!           |')
                print('|',(46*'_'),'|')
                time.sleep(0.3)

        choices = ['R','P','S']

        AI_choice = random.choice(choices)

        if choice == AI_choice:
            print('\033[H\033[J')
            print(50*'_')
            print('|                                                |')
            print('|                   ~Draw!                       |')
            print('|',(46*'_'),'|')

            print(50*'_')
            print('|                                                |')
            print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
            print('|',(46*'_'),'|')

            time.sleep(1)
        elif choice == 'S':
            if AI_choice == 'R':
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You lost this round!             |')
                print('|',(46*'_'),'|')
                AI_points = AI_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)
            else:
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You won this round!              |')
                print('|',(46*'_'),'|')
                user_points = user_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)  
        elif choice == 'R':
            if AI_choice == 'P':
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You lost this round!             |')
                print('|',(46*'_'),'|')
                AI_points = AI_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)
            else:
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You won this round!              |')
                print('|',(46*'_'),'|')
                user_points = user_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)
        else:
            if AI_choice == 'S':
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You lost this round!             |')
                print('|',(46*'_'),'|')
                AI_points = AI_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)
            else:
                print('\033[H\033[J')
                print(50*'_')
                print('|                                                |')
                print('|              ~You won this round!              |')
                print('|',(46*'_'),'|')
                user_points = user_points + 1

                print(50*'_')
                print('|                                                |')
                print(f'|      User points = {user_points}     AI_points = {AI_points}         |')
                print('|',(46*'_'),'|')

                time.sleep(1)

        if user_points == 3:
            print('\033[H\033[J')
            print(50*'_')
            print('|              Congratulations :D                |')
            print('|              ~You won the game!                |')
            print('|',(46*'_'),'|')
        elif AI_points == 3:
            print('\033[H\033[J')
            print(50*'_')
            print('|                 I''m sorry! :(                 |')
            print('|              ~You lost the game!               |')
            print('|',(46*'_'),'|')
