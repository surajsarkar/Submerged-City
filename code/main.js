import kaboom from "kaboom";

import { createGameScene, winLooseScene, planeScene } from "./helpers";
import { createLevelOne } from "./level";

// initialize context
kaboom({ background: [0, 105, 148] });

loadSprite("fish", "../sprites/fish.png");
loadSprite("grass", "../sprites/sea_grass_two.png");
loadSprite("plant", "../sprites/sea_plant.png");
loadSprite("plant_top", "../sprites/sea_plant_top.png");
loadSprite("passage", "../sprites/passage.png");
loadSprite("bomb", "../sprites/bomb.png");
loadSprite("user", "../sprites/user.png");

loadSound("underocean", "../sprites/underocean.mp3");
loadSound("blastsound", "../sprites/blastaudio.m4a");

let LEVEL_1 = createLevelOne(box_size = { width: 20, height: 20 })

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
        ],//plant
        "^": () => [
            sprite("plant_top"),
            area(),
        ],//plant_top
        "-": () => [
            sprite("fish"),
            area(),
            scale(rand(0.5, 1)),
            z(randi(1, 11)),
            "fish", //tag
        ],//fish
        "g": () => [
            sprite("grass"),
            area(),
            scale(2),
            solid(),
        ],//grass
        "p": () => [
            sprite("passage"),
            solid(),
            area(),
            "passage", //tag
        ],//passage
        "b": () => [
            sprite("bomb"),
            area(),
            scale(0.8),
            "bomb", //tag
        ],//bomb
    },
    next_screen_tag = "start",
    has_tips = false,
    tips_id = "",
    tips_params_list = [],
);


// creating start screen
planeScene("start", "plant", true, "start game", false, 0, ()=> go("level_one", 100, 4, 100, 0));

// creating result screen 
winLooseScene("result");

go("start");