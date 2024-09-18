# Board Representation

Here we are, the humble beginnings of my project. The first step in pretty much all journeys of chess programming, and the first question that gets asked is:

_How do I want to represent my board?_

![A chess board, pieces arranged in the starting position.](./Assets/1/Starting%20Board.png)

There are a number of ways to internally represent a chess board in code, and I'll go over the 3 ways people typically do this:
1. Using a 2D array
2. Using a 1D array
3. Using bitboards

I'll do my best to go reasonably in-depth on each method, providing an insight into how exactly you would go about this, but don't expect a full implementation of each method. That's something you have to do on your own.

## Using a 2D array

Conceptually, this is the easiest. The board is, itself, an 8 by 8 grid of squares, so it makes sense to represent it in code as an 8x8 matrix, or in other words, a 2-dimensional array. That's one positive of this method: it's intuitive. This is, by far, the easiest solution to both understand and conceive. You want the square on the 5th rank from the top and the 3rd square from the left? Easy. `board[4][2]`. That's another benefit of this method: incredibly easy to use.

You'd think will all these benefits, being that it's easy to use and easy to understand, that this would be the perfect method. Why do we need 3 others?

Well, this _would_ be perfect. Until you realise that access times in a 2-dimensional array are terrible. And that's the same in every language you'll use.

The thing is, each "row" in the matrix is a separately allocated dynamic array.[^1] In English, that means that each array inside the matrix is, itself, it's own collection of items stored in its own section of memory: this means you'll need both more memory and have to access two arrays, [making it fat and slow.](https://medium.com/@patdhlk/c-2d-array-a-different-better-solution-6d371363ebf8)

This is why it's not recommended to use a 2-dimensional array - at the cost of ease of use is more memory allocation and slower runtime speeds.

## Using a 1D array

So we remove the overhead of needing to allocate more memory for multiple arrays and to access a value through two arrays. Amazing. This must be better than the 2D array, right?

Well, you're not wrong. It _is_ faster than using a 2D array, but we are still left with the issue that we need to access an array in the first place. Imagine how slow it would be if we were generating moves for a rook, for example, and we'd have to constantly lookup pieces in the array at different positions. At speeds needed to make the program usable, a "pure" implementation of a 1D array wouldn't work well.

This also comes with another downside. In the 2D array, you can check if a square is valid by simply trying to access that portion of the array. If you get an out-of-bounds error, then you know that you've reached the end of your array and can't go any further. However, in our new 1D array, starting at say, square 31 on the H file, trying to go another square out to the right (which is adding 1), you'd end up on square 32, looping back to the A file and going onto the next rank. This means if you were checking rook moves, you wouldn't scan just the rank, but instead the all the rows above and below you until you run into a piece:
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

