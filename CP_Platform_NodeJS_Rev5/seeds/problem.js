const mongoose = require('mongoose')

const problem = [
  {
    name: "Problem A  Azulejos",
    time: "Time limit: 10 seconds",
    problem: "Ceramic artists Maria and João are opening a small azulejo store in Porto. Azule- jos are the beautiful ceramic tiles for which Portugal is famous.  Maria and João want to create an attractive window display,  but,  due to limited space in their shop, they must arrange their tile samples in two rows on a single shelf. Each of João’s tiles has exactly one of Maria’s tiles in front of it and each of Maria’s tiles has exactly one of João’s tiles behind it.  These hand-crafted tiles are of many different sizes, and it is important that each tile in the back row is taller than the tile in front of it so that both are visible to passers-by.  For the convenience of shoppers, tiles in each row are arranged in non-decreasing order of price from left to right.  Tiles of the same price may be arranged in any order subject to the visibility condition stated above. Azulejo in the cathedral of Porto. Source: Wikimedia Commons. Your task is to find an ordering of the tiles in each row that satisfies these constraints, or determine that no such ordering exists.",
    input: "The first line of input contains an integer n (1    n    5  105), the number of tiles in each row. The next four lines contain n integers each; the first pair of lines represents the back row of tiles and the second pair of lines represents the front row.  Tiles in each row are numbered from 1 to n according to their ordering in the input.  The first line in each pair contains n integers p1, . . . , pn (1     pi     109 for each i), where pi is the price of tile number i in that row.  The second line in each pair contains n integers h1, . . . , hn (1 ≤ hi ≤ 109 for each i), where hi is the height of tile number i in that row.",
    output: "If there is a valid ordering, output it as two lines of n integers, each consisting of a permutation of the tile numbers from 1 to n. The first line represents the ordering of the tiles in the back row and the second represents the ordering of the tiles in the front row.  If more than one pair of permutations satisfies the constraints, any such pair will be accepted. If no ordering exists, output impossible.",
    sampleInputOne: "4	3	2	1		2		2	3	4		3	2	1	2		1	2	2	1		3",
    sampleInputTwo: "2 1 2 2 3 2 8 2 1",
    sampleOutputOne:"3 2	4	1	4	2	1	3",
    sampleOutputTwo:"impossible"
  },
  {
    name: "Problem B Beautiful Bridges",
    time: "Time limit: 10 seconds",
    problem: "What connects us all? Well, it is often bridges. Since an- cient times, people have been building bridges for roads, for trains, for pedestrians, and as aqueducts to transport water. It is humanity’s way of not taking inconvenient geography for an answer. The company Arch Bridges Construction (ABC) specializes in—you guessed it—the construction of arch bridges. This classical style of bridge is supported by pillars that extend from the ground below the bridge. Arches between pillars dis- tribute the bridge’s weight onto the adjacent pillars. Example of a Roman arch bridge. Source: Wikimedia Commons. The bridges built by ABC often have pillars spaced at irregular intervals. For aesthetic reasons, ABC’s bridges always have semicircular arches, as illustrated in Figure B.1. However, while a bridge arch can touch the ground, it cannot extend below the ground. This makes some pillar placements impossible. Given a ground profile and a desired bridge height h,  there are usually many ways of building an  arch bridge. We model the ground profile as a piecewise-linear function described by n key points  (x1, y1), (x2, y2), . . . , (xn, yn), where the x-coordinate of a point is the position along the bridge, and the y-coordinate is the elevation of the ground above sea level at this position along the bridge. The first and last pillars must be built at the first and last key points, and any intermediate pillars can be built only at these key points. The cost of a bridge is the cost of its pillars (which is proportional to their heights) plus the cost of its arches (which is proportional to the amount of material used). So a bridge with k pillars of heights h1, . . . , hk that are separated by horizontal distances d1, . . . , dk−1 has a total cost of k	k−1 α · Σ hi + β · Σ d2 i=1	i=1 for some given constants α and β. ABC wants to construct each bridge at the lowest possible cost.",
    input: "The first line of input contains four integers n, h, α, and β, where n (2 n  104) is the number of points describing the ground profile, h (1 h 105) is the desired height of the bridge above sea level, and α, β (1 α, β 104) are the cost factors as described earlier. Then follow n lines, the ith of which contains two integers xi, yi (0  x1  < x2  < . . . < xn  105 and 0   yi < h), describing the ground profile.",
    output: "Output the minimum cost of building a bridge from horizontal position x1 to xn at height h above sea level. If it is impossible to build any such bridge, output impossible.",
    sampleInputOne: "5 60	18	2 0 0		 20 20	    30 10		    50 30		    70 20		    ",
    sampleInputTwo: "4 10	1	1     0 0		    1 9		    9 9	    10 0	    ",
    sampleOutputOne:"6460",
    sampleOutputTwo:"impossible"
  },
]

module.exports = problem;