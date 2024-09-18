# Board Representation

Here we are, the humble beginnings of my project. The first step in pretty much all journeys of chess programming, and the first question that gets asked is:

_How do I want to represent my board?_

![A chess board, pieces arranged in the starting position.](./Assets/1/Starting%20board.png)

There are a number of ways to internally represent a chess board in code, and I'll go over the 3 ways people typically do this:
1. Using a 2D array
2. Using a 1D array
3. Using bitboards

I'll do my best to go reasonably in-depth on each method, providing an insight into how exactly you would go about this, but don't expect a full implementation of each method. That's something you have to do on your own.

## Using a 2D array

Conceptually, this is the easiest. The board is, itself, an 8 by 8 grid of squares, so it makes sense to represent it in code as an 8x8 matrix, or in other words, a 2-dimensional array. That's one positive of this method: it's intuitive. This is, by far, the easiest solution to both understand and conceive. You want the square on the 5th rank from the top and the 3rd square from the left? Easy. `board[4][2]`. That's another benefit of this method: incredibly easy to use.

You'd think will all these benefits, being that it's easy to use and easy to understand, that this would be the perfect method. Why do we need 3 others?

Well, this _would_ be perfect. Until you realise that access times in a 2-dimensional array are terrible. And that's the same in every language you'll use.

The thing is, each "row" in the matrix is a separately allocated dynamic array. In English, that means that each array inside the matrix is, itself, it's own collection of items stored in its own section of memory: this means you'll need both more memory and have to access two arrays, [making it fat and slow.](https://medium.com/@patdhlk/c-2d-array-a-different-better-solution-6d371363ebf8)

This is why it's not recommended to use a 2-dimensional array - at the cost of ease of use is more memory allocation and slower runtime speeds.

## Using a 1D array

So we remove the overhead of needing to allocate more memory for multiple arrays and to access a value through two arrays. Amazing. This must be better than the 2D array, right?

Well, you're not wrong. It _is_ faster than using a 2D array, but we are still left with the issue that we need to access an array in the first place. Imagine how slow it would be if we were generating moves for a rook, for example, and we'd have to constantly lookup pieces in the array at different positions. At speeds needed to make the program usable, a "pure" implementation of a 1D array wouldn't work well.

This also comes with another downside. In the 2D array, you can check if a square is valid by simply trying to access that portion of the array. If you get an out-of-bounds error, then you know that you've reached the end of your array and can't go any further. However, in our new 1D array, starting at say, square 31 on the H file, trying to go another square out to the right (which is adding 1), you'd end up on square 32, looping back to the A file and going onto the next rank.

This means if you were checking rook moves and weren't careful enough, checking horizontally would mean that you would run across the board and loop back around again.

### Example
Take this position for example:

![Example position that demonstrates what happens with a 1D array.](./Assets/1/Issues%20with%201D%20array.png)

Here, I've shown a text-based version of the chess board, along with what woould happen when moving around on the 2D array and on the 1D array.
```yml
# Board				# 2D array			# 1D array
. . . . . . . .     . . . . . . . .     . . . . . . . .
. . . . . . . .     . . . . . . . .     . . . . . . . .
. . B . . . . .     . . x . . . . .     . . x 1 1 1 1 1
. . . . . . . .     . . 1 . . . . .     1 1 1 1 1 1 1 1
. . r . . P . .     1 1 . 1 1 x . .     1 1 . 1 1 x . .
. . Q . . . . .     . . x . . . . .     . . x . . . . .
. . . . . . . .     . . . . . . . .     . . . . . . . .
. . Q . . . . .     . . . . . . . .     . . . . . . . .
```

The `1`'s in this grid represent a square that's been checked, and an `x` means a piece has been met. Because we don't have the boundaries of the 2D array, when moving a "cursor" bit around the bitboard and going off an edge, we wrap back around to the other side, meaning that we need to now manually check each direction when we move there.

## Using Bitboards

The cream of the crop - the best option on the list, and I'll explain why.

The concept of a bitboard should be really easy to understand: it's a number where the bits of its binary representation encode some form of information about the game board - you store information about the board in a number. In the case of chess, that can be where a piece is and isn't, like this.

### Example

Below is the starting position of the game of Chess:

![Starting position of the game of Chess.](Assets/1/Starting%20board.png)

Where are the white pawns? Well, they're on the second rank.

![Starting position, pawns highlighted.](Assets/1/Pawns%20highlighted.png)

Now, let's remove the pawns and look at the result.

![Where the white pawns are placed, highlighted](Assets/1/Blank%20board,%20pawns%20highlighted.png)

We have two states, highlighted and unhighlighted. Representing those as 1s and 0s, we can encode it like this:
```yml
00000000
00000000
00000000
00000000
00000000
00000000
11111111
00000000
```

Putting it all together, we get this:
```yml
00000000 00000000 00000000 00000000 00000000 00000000 11111111 00000000
```

Or, converting this to binary, we get the number `65,280` where the bits in this number represent White's pawns on the board.

## For Future

I'll be using what's called the Little Endian format when I do my bitboards. This means that you count upwards from the bottom-left square: A1 has a value of 0, H1 a value of 7, then you loop up to A2 being 8.

The two boards below relate squares to bit indexes:
```yml
A8 B8 C8 D8 E8 F8 G8 H8     56 57 58 59 60 61 62 63
A7 B7 C7 D7 E7 F7 G7 H7     48 49 50 51 52 53 54 55
A6 B6 C6 D6 E6 F6 G6 H6     40 41 42 43 44 45 46 47
A5 B5 C5 D5 E5 F5 G5 H5     32 33 34 35 36 37 38 39
A4 B4 C4 D4 E4 F4 G4 H4     24 25 26 27 28 29 30 31
A3 B3 C3 D3 E3 F3 G3 H3     16 17 18 19 20 21 22 23
A2 B2 C2 D2 E2 F2 G2 H2      8  9 10 11 12 13 14 15
A1 B1 C1 D1 E1 F1 G1 H1      0  1  2  3  4  5  6  7
```