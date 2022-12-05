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
        "                                        aaaaaaaaaaaaaaaaa              ",
        "                                        asssssssssssssssa              ",
        "                                        as             sa              ",
        "                                        as             sa              ",
        "                                              sss      sa              ",
        "                                              s s      sa              ",
        "                                              s s      sa              ",
        "                                              s s      sa              ",
        "                                          ssssssssssssssa              ",
        "                aaaaaaaaaaaaaaa           aaaaaaaaaaaaaaa              ",
        "i               asssssssssssssa                                        ",
        "i               assss        sa                                        ",
        "i               assss        sa                                        ",
        "i               assss                                                  ",
        "i               assss                                                  ",
        "i               assss                                                  ",
        "i               asssssssssssss                                         ",
        "i               aaaaaaaaaaaaaaa                                        ",
        "ii                                                                     ",
        "iiiiii**                                                               ",
        "iii***ii*****                                                          ",
        "iiiii**ii****                                                          ",
        "i^i^iiiiiii^^                                                          ",
        "i**iiiiiiii** ^  -  -  -  -  -  -  -                                   ",
        "i**ii^iii**** **    b    -    --   -                                   ",
        "^iii**ii**ii** ** b - - - -                                            ",
        "**ii****i^i**ii**   -   -   - b   -   - b                              ",
        "i**ii**i**ii**ii**  -  -  -  -  -  -                                   ",
        "**ii**i**ii**i{}** - -  - - -  b - -                                   ",
        "i**ii**ii*ii**()  ** - b  -  - -                                       ",
        "**ii**iii**i**() **   -  -  -   -  -                                   ",
        "i**ii**i**ii*i() *  - -  -  -                                          ",
        "**ii**ii**i**i()**                                                     ",
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