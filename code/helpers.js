import kaboom from "kaboom";
// kaboom();
export const createGameScene = (scene_id, level, level_options, time_left = "00:00", bomb_count = 0) => {
    /** 
    *@param {string} scene_id name of the scene
    **/
    scene(scene_id,
        () => {
            gravity(200);
            const score_board = add([
                rect(250, 50),
                outline(2, color(255, 255, 0),),
                pos(10, 10),
                color(255, 125, 0)
            ]);

            const score_label = add([
                text(`Time Left: ${time_left}`, { size: 18, font: "sink", },),
                pos(score_board.pos.x + 10, 25),
                // origin("center"),
            ]);

            const bomb_counter = add([
                rect(80, 50),
                outline(2, color(255, 255, 0),),
                pos(score_board.pos.x + 260, 10),
                color(255, 125, 0),
            ])

            const bomb_sprite_label = add([
                sprite("bomb"),
                pos(bomb_counter.pos.x + 5, 15),
            ])

            const bomb_count_label = add([
                text(`${bomb_count}`, { font: "sink", size: 30 }),
                pos(bomb_sprite_label.pos.x + 50, 20)
            ])

            addLevel(
                level,
                level_options,
            );//addLevel

            const player = add([
                sprite("user"),
                pos(width() - 40, 30),
                body(),
                solid(),
                area(),
                health(100),
            ]);

            const player_health_box = add([
                rect(100, 50),
                outline(2, color(255, 255, 0),),
                pos(bomb_counter.pos.x + 90, 10),
                color(255, 125, 0),
            ]);

            const player_health_sprite = add([
                sprite("grass"),
                pos(player_health_box.pos.x + 5, 15),
            ]);

            const health_count_label = add([
                text("", {size: 18, font: "sink"},),
                pos(player_health_sprite.pos.x + 50, 25),
                {update(){this.text = player.hp()}},
            ]);

            // Todo: add score board
            // Todo: add health score
            // Todo: add time left
            // add bombs count
            // add powers count
            // Todo add points
        }//scene def
    );//scene
}//createGameScene

