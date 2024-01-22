# Keyboard layout battles - proof of concept

Written in basic js, to check how the typing submission will feel.

Submission of a battle between 2 layouts involve having a human typer that types pairs of translated words. The time taken for each translated word is recorded and then used to decide the winner and loser of the match. Elo of the layouts can thet be calculated.

# Recording method

1. Let the base layout be a keyboard layout that a typer will use.
2. Random 2 layouts to battle each other. Let these be `A` and `B`. If `A` or `B` is too similar to the base layout, random another pair until no longer similar.
3. Random 5 words such that it satifies:
    - For any character `c` occuring in any of the words, the position of `c` in `A` OR `B` cannot be the same as the base layer.
    - If `c` has the same position in `A` and the base layer, then it also has to be positioned the same in `B`. And vice versa.
    - Example: when the base layout is QWERTY, `A` is Colemak, and `B` is Dvorak: Words chosen cannot contain 'a' because it has the same place in the base layout and `A` but not in `B`. But if `B` is Workman, then 'a' is valid because it has the same placement in all 3 layouts.
4. Translate the 5 words into pairs of words, each translated from the base layer into `A` and `B`.
5. For each word pair, the following will be done:
    1. Arrange the pair and duplicate them infinitely. (`translated_word1 translated_word2 translated_word1 translated_word2 ...` )
    2. Typer will type and time taken for each word will be recorded. A point system will be established where if a word is typed faster than both of the neighbouring words, then a point is given to the respective layout `A` or `B`. Typing ends when the point difference between them reaches 5. The first word is ignored and more words can be padded to the end to make the typing experience seamless.
    3. Sum the time taken to type the last 3 words of each layout ignoring the very last word and keep this sum. Subsequent pairs of words will add up to this sum.
    4. When typer makes an error, the time for the current word and the next word and not counted. The two words are removed from the virtual list and the previous word's right neighbour will be the word after the next word. Hence, the alternation is preserved.
    5. The number of words typed should not exceed 20 and the battle for this pair will be counted as a draw if it has not ended before then. The times are also ignored and not added to the total time sum.
6. To decide the result of the battle:
    1. If the number of draws in the battles reach 3 out of 5 pairs. then the whole battle is treated as a draw.
    2. Compare the total sum taken to type the translated words from `A` and `B`. The layout with the lower total time becomes the Winner.
