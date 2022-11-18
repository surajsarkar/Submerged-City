import kaboom from "kaboom";

export let LEVEL_1 = [
    "           ** ^  -  -  -  -  -  -  -                                   ",
    "     ^     ** **    b    -    --   -                          u        ",
    "^   **      ** ** b - - - - b                            b             ",
    "**  **   ^ **  **   -   -   - b   -   - b                              ",
    " **  ** **  **  **  -  -  -  -  -  -                                   ",
    "**  ** **  **  **  - -  - - -  b - -                                   ",
    " **  ** ** **   ** - b  -  - -                                         ",
    "**  **   ** ** **   -  -  -   -  -                                     ",
    " **  ** **  * p *  - -  -  -                                           ",
    "**  **  ** **  **                                                      ",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
]

//Todo level 2 
//Todo level 3
//Todo level 4

export const createLevelOne = (box_size) => {
    let no_of_box = Math.floor(width() / box_size.width);
    let LEVEL_1 = [
        "           ** ^  -  -  -  -  -  -  -                                   ",
        "     ^     ** **    b    -    --   -                                   ",
        `^   **      ** ** b - - - - b${buildSeq(quantity = no_of_box - no_of_box * 0.5, symbol = ' ')}b${buildSeq(quantity = no_of_box * 0.5, symbol = ' ')}`,
        "**  **   ^ **  **   -   -   - b   -   - b                              ",
        " **  ** **  **  **  -  -  -  -  -  -                                   ",
        "**  ** **  **  **  - -  - - -  b - -                                   ",
        " **  ** ** **   ** - b  -  - -                                         ",
        "**  **   ** ** **   -  -  -   -  -                                     ",
        " **  ** **  * p *  - -  -  -                                           ",
        "**  **  ** **  **                                                      ",
        `${buildSeq(no_of_box, "g")}`,
    ]
    return LEVEL_1;

}//createLevel

const buildSeq = (quantity, symbol = " ") => {
    let base = "";
    for (let i = 0; i < quantity; i++) {
        base += symbol
    }//for

    return base;
}//buildSeq