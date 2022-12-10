import kaboom from "kaboom";

import { createGameScene, winLooseScene, planeScene, } from "./helpers";
import { createLevel, LEVEL_ONE, level_two_cofing, LEVEL_TWO, level_three_cofing, LEVEL_THREE } from "./level";

// initialize context
kaboom({ background: [0, 105, 148],});

layers(["bg", "ui", "game"], "game");

loadSprite("fish", "../sprites/fish.png");
loadSprite("grass", "../sprites/grass.png");
loadSprite("plant", "../sprites/sea_plant.png");
loadSprite("plant_top", "../sprites/sea_plant_top.png");
loadSprite("gate_1_bl", "../sprites/gate_1_bl.png");
loadSprite("gate_1_br", "../sprites/gate_1_br.png");
loadSprite("gate_1_tl", "../sprites/gate_1_tl.png");
loadSprite("gate_1_tr", "../sprites/gate_1_tr.png");
loadSprite("gate_2_bl", "../sprites/gate_2_bl.png");
loadSprite("gate_2_br", "../sprites/gate_2_br.png");
loadSprite("gate_2_tl", "../sprites/gate_2_tl.png");
loadSprite("gate_2_tr", "../sprites/gate_2_tr.png");
loadSprite("bomb", "../sprites/bomb.png");
loadSprite("blade", "../sprites/blade.png");
loadSprite("mbrick", "../sprites/mbrick.png");
loadSprite("treasure", "../sprites/treasere.png");
loadSprite("user", "../sprites/user.png");
loadSprite("gcoin", "../sprites/gcoin.png");
loadSprite("wallbrick", "../sprites/wallbrick.png");
loadSprite("sageBrick", "../sprites/sageBrick.png");
loadSprite("healthLbl", "../sprites/health.png");
loadSprite("invisible_wall", "../sprites/invisible_wall.png");
loadSprite("harry_health", "../sprites/harry_health.png");
loadSprite("stone", "../sprites/glowing_stone.png");
loadSprite("startBg", "../sprites/startBg.png");
loadSprite("lost", "../sprites/you_lost.png");
loadSprite("levelup", "../sprites/levelup.png");
loadSprite("winner", "../sprites/winner.png");
loadSprite("scoreBg", "../sprites/scoreBg.png");
loadSprite("gameBg", "../sprites/gameBg.png");
loadSprite("chat_1", "../sprites/chat_1.png");
loadSprite("chat_2", "../sprites/chat_2.png");
loadSprite("chat_3", "../sprites/chat_3.png");
loadSprite("chat_4", "../sprites/chat_4.png");
loadSprite("chat_5", "../sprites/chat_5.png");
loadSprite("chat_6", "../sprites/chat_6.png");

loadSound("underocean", "../sprites/underocean.mp3");
loadSound("blastsound", "../sprites/blastaudio.m4a");
loadSound("coinCollection", "../sounds/score.mp3");



let LEVEL_1 = createLevel(box_size = { width: 20, height: 20 }, level=LEVEL_ONE);
let LEVEL_2 = createLevel(box_size = { width: 20, height: 20 }, level=LEVEL_TWO);
let LEVEL_3 = createLevel(box_size = { width: 20, height: 20 }, level=LEVEL_THREE);
level_two_cofing.pos = vec2(0, height() - LEVEL_1.length * 20);
level_three_cofing.pos = vec2(0, height() - LEVEL_1.length * 20);

createGameScene(scene_id = "level_one",
    level = LEVEL_1,
    level_options = {
        width: 20,
        height: 20,
        pos: vec2(0, height() - LEVEL_1.length * 20),
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
        "-": () => [
            sprite("fish"),
            area(),
            scale(rand(0.5, 1)),
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
            sprite("gate_1_bl"),
            solid(),
            area(),
            "passage", //tag
        ],//gate_1
        ")": () => [
            sprite("gate_1_br"),
            solid(),
            area(),
            "passage", //tag
        ],//gate_1
        "{": () => [
            sprite("gate_1_tl"),
            solid(),
            area(),
            "passage", //tag
        ],//gate_1
        "}": () => [
            sprite("gate_1_tr"),
            solid(),
            area(),
            "passage", //tag
        ],//gate_1
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
            scale(0.5),
        ],
        "s": ()=>[
            sprite("sageBrick"),
            solid(),
            area(),
            "safe_space",
            scale(0.25),
        ],
        "a": ()=>[
            sprite("sageBrick"),
            solid(),
            area(),
            scale(0.25),
            "dist_brick"
        ],
        "n": ()=>[
            sprite("invisible_wall"),
            area(),
            scale(0.25),
            "iwall"
        ]
    },
    next_screen_tag = "level_two",
    has_tips = false,
    tips_id = "",
    tips_params_list = [],
);



createGameScene("level_two", LEVEL_2, level_two_cofing, "level_three", false, "", [],);

createGameScene("level_three", LEVEL_3, level_three_cofing, "start", false, "", [],);


// creating start screen
let firstLevel = () => go("level_one", 100, 0, 100, 0);
planeScene("start", "startBg", true, "start game", false, 0, ()=> go("story_1"));
// scene_id, sprite_tag, should_have_button, button_text, timed, waiting_time, action

// stories
planeScene("story_1", "chat_1", true, "skip >", true, 2, () => go("story_2"));
planeScene("story_2", "chat_2", true, "skip >", true, 2, () => go("story_3"));
planeScene("story_3", "chat_3", true, "skip >", true, 2, () => go("story_4"));
planeScene("story_4", "chat_4", true, "skip >", true, 2, () => go("story_5"));
planeScene("story_5", "chat_5", true, "skip >", true, 2, () => go("story_6"));
planeScene("story_6", "chat_6", true, "skip >", true, 2, firstLevel);

// creating result screen 
winLooseScene("result");

// go("start");
go("start");