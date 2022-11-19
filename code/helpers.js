import kaboom from "kaboom";
// kaboom();
export const createGameScene = (scene_id, 
                                level, 
                                level_options, 
                                time_left = "00:00", 
                                bomb_count = 0
                               ) => {
    /** 
    *@param {string} scene_id: name of the scene
    **/
    scene(
        scene_id,
        () => {
            
            gravity(10);
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
                text("", { font: "sink", size: 30 }),
                pos(bomb_sprite_label.pos.x + 50, 20),
                {
                    update(){
                        this.text = bomb_count;
                    }//update
                }
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
                text("", { size: 18, font: "sink" },),
                pos(player_health_sprite.pos.x + 50, 25),
                { update() { this.text = player.hp() } },
            ]);

            // movement of the user
            onKeyDown("up", () => {
                if (player.pos.y > 100) {

                    player.pos = vec2(player.pos.x, player.pos.y - 2);
                }//if
            });

            onKeyDown("left", () => {
                if (player.pos.x > 5) {
                    player.pos = vec2(player.pos.x - 2, player.pos.y);
                }//if
            });

            onKeyDown("right", () => {
                if (player.pos.x < width() - 45) {
                    player.pos = vec2(player.pos.x + 2, player.pos.y);
                }//if
            });

            // bomb collision 
            player.onCollide("bomb", (bomb)=>{
                if (bomb_count < 5){
                    bomb_count ++;
                    destroy(bomb);
                }//if
            },);//onCollide

            // sm fish collision
            player.onCollide("fish", (fish)=>{
                player.hurt(0.5);
            },
                            );//onCollide

            // collision with passage
            player.onCollide("passage", (passage)=>{
                go("next_level_info");
            },
                            );//onCollide


            // Todo: add score board
            // add powers count
            // Todo add points
        }//scene def
    );//scene
}//createGameScene


let getDistance = (object_1_pos, object_2_pos) => {
    
}//getDistance

