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


export let LEVEL_ONE = [
        "                                                                                       ",
        "                                        aaaaaaaaaaaaaaaaa                              ",
        "                                        asssssssssssssssa                              ",
        "                                        asnnnnnnnnnnnnnsa                              ",
        "                                        asnnnnnnnnnnnnnsa                              ",
        "                                          nnnnsssnnnnnnsa                              ",
        "                                          nnnnsssnnnnnnsa                              ",
        "                                          nnnnsssnnnnnnsa                              ",
        "                                          nnnnsssnnnnnnsa                              ",
        "                                        ssssssssssssssssa                              ",
        "                                                                                       ",
        "i               asssssssssssssa                                                        ",
        "i               asssnnnnnnnnnsa                                                        ",
        "i               asssnnnnnnnnnsa                                                        ",
        "i               asssnnnnnnnnnnn                                                        ",
        "i               asssnnnnnnnnnnn                                                        ",
        "i               asssnnnnnnnnnnn                                                        ",
        "i               asssssssssssssn                                                        ",
        "i               aaaaaaaaaaaaaaa                                                        ",
        "ii                                                                                     ",
        "iiiiii**                                                                               ",
        "iii***ii*****                                                                          ",
        "iiiii**ii****                                                                          ",
        "i^i^iiiiiii^^                                                                          ",
        "i**iiiiiiii** ^  -  -  -  -  -  -  -                                                   ",
        "i**ii^iii**** **    b    -    --   -                                                   ",
        "^iii**ii**ii** ** b - - - -                                                            ",
        "**ii****i^i**ii**   -   -   - b   -   - b                                              ",
        "i**ii**i**ii**ii**  -  -  -  -  -  -                                                   ",
        "**ii**i**ii**i{}** - -  - - -  b - -                                                   ",
        "i**ii**ii*ii**()  ** - b  -  - -                                                       ",
        "**ii**iii**i**() **   -  -  -   -  -                                                   ",
        "i**ii**i**ii*i() *  - -  -  -                                                          ",
        "**ii**ii**i**i()**                                                                     ",
    ]

//Todo level 2

export let LEVEL_TWO = [
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "                                                                                       ",
        "       ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss                    ",
        "      snnnnnnnnnnnnnnnnnnnnnninnnnnnnnnnnnninnnnnnnnnnnnnnnnnnnnnns                    ",
        "     snnnnnsssssnnnnnnnnnnnnniiiiinnnbnnnnninnnnnnnnnnnnnnnnnnnnnns                    ",
        "    snnnnnnnnnnnnnnnnniiiinnnnnnnnnnnnnnnnnnnnnnninnnnnnnnnnnnnnnns                    ",
        "   snnnnnnnnnnnnnnnnnnntninnnnnnnnnnnnnnnnnnnnnnninnnnnnnnnnnnnnnns                    ",
        "iiiisnnnnnnnnnnnnnnssssssssssssssssssssssssssssssssssssssssssssssss                    ",
        "iiiis|             |siiiiiiiiiiiiisd     s                                             ",
        "iiiiis|             |siiiiiiiiiiisd     s                                              ",
        "iiiiiis|             |siiiiiiiiis     ts                  ^^                           ",
        "iiiiiiis|             |siiiiiiis     ds                   **     ^^                    ",
        "iiiiiiiis|            |siiiiiis      s           ^         **    **                    ",
        "iiiiiiiiis|           |siiiiist     s           *   ^^      **   **                    ",
        "iiiiiiiiiis|          |siiisd    tsi ^           *   **       **  **                   ",
        "iiiiiiiiiis|          |siisd    dsiii*    b      *    **     **  **                    ",
        "iiiiiiiiiis|           |ssd    dsiiiii**         *   **     **    **                   ",
        "iiiiiiiiiis|             s    dsiiiiiii**       *   **     **   b  **                  ",
        "iiiiiiiiiis|              s  dsiiiiiiiii**  b      *    **   **       **               ",
        "iiiiiiiiiis|               s siiiiiiiiiii**     **   **    **  b   **                  ",
        "iiiiiiiiiis|               ssiiiiiiiiiiiii**     **   **    **   **                    ",
        "iiiiiiiiiis|              siiiiiiiiiiiiiiii**  **    **    **  **                      ",
        "iiiiiiiiiis|           |siiiiiiiiiiiiiiiiii***  **     **   **  **                     ",
        "iiiiiiiiiism           msiiiiiiiiiiiiiiiiiiii** ** b  **  **   **                      ",
        "iiiiiiiiism            msiiiiiiiiiiiiiiiiiiiiii***     **   **  **                     ",
        "iiiiiiiiis     {}        siiiiiiiiiiiiiiiiiiiiii**  b **   **  **                      ",
        "iiiiiiiis      ()         siiiiiiiiiiiiiiiiiiiiii**  b  **   **  **                    ",
        "iiiiiim        ()         miiiiiiiiiiiiiiiiiiiiiii** **   **   **                      ",
        "iiiiis                    siiiiiiiiiiiiiiiiiiiiiiii****                                ",
    ]


//Todo level 3
//Todo level 4

export const createLevel = (box_size, level) => {
    let no_of_box = Math.floor(width() / box_size.width);
    level.push(buildSeq(no_of_box, "g"));
    return level;
}//createLevel

const buildSeq = (quantity, symbol = " ") => {
    let base = "";
    for (let i = 0; i < quantity; i++) {
        base += symbol
    }//for

    return base;
}//buildSeq


export let level_two_cofing = {
    width: 20,
    height: 20,
    "*": () => [
            sprite("plant"),
            area(),
            z(randi(1, 10)),
            scale(0.5)
        ],//plant
    "^": () => [
        sprite("plant_top"),
        area(),
        scale(0.5)
    ],//plant_top
    "|": () => [
        sprite("grass"),
        area(),
        scale(0.30),
        z(randi(1, 11)),
        rotate(0),
        "fish", //tag
    ],//fish
    "g": () => [
        sprite("grass"),
        area(),
        scale(0.25),
        solid(),
    ],//grass
    "(": () => [
        sprite("gate_2_bl"),
        solid(),
        scale(0.5),
        area(),
        "passage", //tag
    ],//gate_2
    ")": () => [
        sprite("gate_2_br"),
        solid(),
        area(),
        scale(0.5),
        "passage", //tag
    ],//gate_2
    "{": () => [
        sprite("gate_2_tl"),
        solid(),
        scale(0.5),
        area(),
        "passage", //tag
    ],//gate_2
    "}": () => [
        sprite("gate_2_tr"),
        solid(),
        scale(0.5),
        area(),
        "passage", //tag
    ],//gate_2
    "b": () => [
        sprite("bomb"),
        area(),
        scale(0.8),
        "bomb", //tag
    ],//bomb
    "i": ()=>[
        sprite("wallbrick"),
        solid(),
        area(),
        "wall",
        scale(0.25),
    ],
    "s": ()=>[
        sprite("sageBrick"),
        solid(),
        area(),
        "safe_space",
        scale(0.25),
    ],
    "n": ()=>[
        sprite("invisible_wall"),
        area(),
        scale(0.25),
        "iwall"
    ],
    "n": ()=>[
            sprite("invisible_wall"),
            area(),
            scale(0.25),
            "iwall"
    ]
}