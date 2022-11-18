import kaboom from "kaboom";

import { createGameScene } from "./helpers";
import {createLevelOne} from "./level";

// initialize context
kaboom({ background: [0, 105, 148] });

loadSprite("fish", "../sprites/fish.png");
loadSprite("grass", "../sprites/sea_grass_two.png");
loadSprite("plant", "../sprites/sea_plant.png");
loadSprite("plant_top", "../sprites/sea_plant_top.png");
loadSprite("passage", "../sprites/passage.png");
loadSprite("bomb", "../sprites/bomb.png");
loadSprite("user", "../sprites/user.png");


let LEVEL_1 = createLevelOne(box_size={width: 20, height: 20})

createGameScene(scene_id = "level_one", 
                level = LEVEL_1, 
                level_options = {
    width: 20,
    height: 20,
    pos: vec2(0, height() - LEVEL_1.length * 20),
    "*": () => [
        sprite("plant"),
        area(),

    ],//plant
    "^": () => [
        sprite("plant_top"),
        area(),
    ],//plant_top
    "-": () => [
        sprite("fish"),
        area(),
        scale(rand(0.3, 1)),
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
    ],//passage
    "b": () => [
        sprite("bomb"),
        area(),
        scale(0.2, 0.3),
    ],//bomb
    "u": () => [
        sprite("user"),
        solid(),
        // body(),
        area(),
    ],//user

},
);



go("level_one");