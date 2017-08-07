# SuperMarioBros

A work-in-progress remake of the original Super Mario Bros. for NES, in the browser using canvas and P5JS/P5.play (fork by islemaster).

(Comes in a NodeJS server, only because I like using Pug. NodeJS isn't important to the project, it can be run on any server)

## Progress

1. [Basic asset loading, movement and camera work made](http://i.imgur.com/WgcUSEh.gifv)
2. [Resized the canvas and repositioned the ground tiles to better match the original Mario game](http://i.imgur.com/0GFAbRo.gifv)
3. [Brick shattering animation added](http://i.imgur.com/XFT7NvN.gifv)
4. [Sounds, music and rough block states (sound warning)](https://youtu.be/i4Z-SBa1dcw)
5. [Changed player sprite to be Mario](http://i.imgur.com/n8PbQ8q.gifv)
6. [Added "Super" Mario and the different jump sound (sound warning)](https://youtu.be/dezm86BU1kI)
7. [Started adding proper block states, block types, small Mario cannot break blocks anymore (only "Super" Mario)](http://i.imgur.com/PY81ux6.gifv)
8. Changed level handling to better support mutliple levels
9. [Fixed sprite sheets using a P5.play fork by islemaster, changed background color](http://i.imgur.com/SbUyar5.gifv) ([click ehre for the fork](https://github.com/islemaster/p5.play/blob/d6a83d4a017455d557019eaa317083f27e78e4e1/lib/p5.play.js))
10. [Started working on items](http://i.imgur.com/9X1OGQx.gifv)
11. [Removed test blocks and started working on the proper World 1-1 layout (Sound warning)](https://youtu.be/ZL_GsCuLMkU)

## Known bugs

1. [Spam-jumping into blocks which can be "pushed" (item blocks, bricks (as small Mario), etc) can result in glitchy movemnet and the blocks position being displaced](http://i.imgur.com/zq1IATz.gifv)
2. Some collision issues with hitting the sides of blocks
3. Item spawing from blocks have no animations, mushrooms don't move and have no collision
4. There is no "small" and "big" jumps, nor anything between. All jumps are the same height
5. Weird 'snapping' bug (probably caused by a collision error) which 'snaps' Mario to the center of a block if you jump and land off center