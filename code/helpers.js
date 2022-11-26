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
                    update() {
                        this.text = bomb_count;
                    }//update
                }
            ])

            addLevel(
                level,
                level_options,
            );//addLevel

            const player = add([
                sprite("user", { flipX: false, },),
                pos(width() - 40, 30),
                body(),
                solid(),
                area(),
                rotate(-10),
                z(5),
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
                { update() { this.text = `${player.hp()}` } },
            ]);

            // movement of the user
            onKeyDown("up", () => {
                if (player.pos.y > 0) {
                    if (player.angle === 0) {
                        player.angle += 30;
                    }//if
                    player.pos = vec2(player.pos.x - 3, player.pos.y - 3);
                }//if
            });

            onKeyRelease("up", () => {
                if (player.angle === 30) {
                    player.angle -= 30;
                }//if 
            });

            onKeyDown("left", () => {
                if (player.pos.x > 5) {
                    if (player.angle === 0) {
                        playe.angle -= 30;
                    }//if
                    player.pos = vec2(player.pos.x - 4, player.pos.y);
                }//if
            });

            onKeyRelease("left", () => {
                if (player.angle === -30) {
                    player.angle += 30;
                }//if
            });

            onKeyDown("right", () => {
                if (player.pos.x < width() - 45) {
                    player.pos = vec2(player.pos.x + 4, player.pos.y);
                }//if
            });

            onKeyDown("down", () => {
                if (player.pos.y < height() - 45) {
                    player.pos = vec2(player.pos.x, player.pos.y + 4);
                }//if
            });

            // adding bomb 
            onKeyPress(["w", "a", "s", "d"], () => {
                let directions = {
                    "w": vec2(-3, -4),
                    "a": vec2(-3, 4),
                    "s": vec2(0, 4),
                    "d": vec2(3, 4)
                };

                let key = "";
                let keys = ["w", "a", "s", "d"];

                for (let i = 0; i < keys.length; i++) {
                    if (isKeyPressed(keys[i])) {
                        key = keys[i];
                        break;
                    }//if
                }//for

                if (bomb_count > 0) {
                    bomb_count -= 1;

                    let bomb = add([
                        sprite("bomb"),
                        pos(player.pos),
                        area(),
                        move(directions[key], 50),
                        z(0),
                        "blast_bomb",
                    ]);//adding bomb

                    wait(3, () => {
                        // destroying fish inside the radius of 84
                        every("fish", (fish) => {
                            if (getDistance(bomb.pos, fish.pos) < 84) {
                                destroy(fish);
                            }//if
                        });//every

                        let player_bomb_distance = getDistance(player.pos, bomb.pos);

                        addKaboom(bomb.pos);

                        if (player_bomb_distance < 100) {
                            let hurt_amount = player.hp() - (player.hp() * player_bomb_distance / 100);
                            player.hurt(hurt_amount);
                        }//if
                        destroy(bomb);
                        // bounce 
                        bounce(bomb = bomb, victim = player, radius = 200);
                        // add shaky effect after the bomb blasts
                        shake(120);
                    });//wait

                }//if


            });

            // bomb collision 
            player.onCollide("bomb", (bomb) => {
                if (bomb_count < 5) {
                    bomb_count++;
                    destroy(bomb);
                }//if
            });//onCollide

            let should_follow_user = false;
            onUpdate(() => {

                if (!should_follow_user) {
                    should_follow_user = bomb_count > 1 ? true : false;
                    wait(5, () => should_follow_user = true);//wait
                }//if

                if (should_follow_user) {
                    every("fish", (fish) => {
                        fish.move(
                            calculateVec(target = player, follower = fish, offset = 5, x_offset = 400)
                        );//move
                    });//every
                }//if
            });

            // sm fish collision
            player.onCollide("fish", () => {
                player.hurt(0.5);
            },
            );//onCollide

            // collision with passage
            player.onCollide("passage", () => {
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

    let distance_x = (object_1_pos.x - object_2_pos.x) ** 2;
    let distance_y = (object_1_pos.y - object_2_pos.y) ** 2;
    let distance = Math.sqrt(distance_x + distance_y);

    return distance;

}//getDistance


export let changeSign = (num) => {
    num = -1 * num;
    return num;
}//changeSign


let mod = (num) => {
    if (num < 0) {
        return num * -1;
    }//if
    return num;
}//mod

let calculateVec = (target, follower, offset, x_offset) => {
    let dx = target.pos.x - follower.pos.x;
    let dy = target.pos.y - follower.pos.y;
    // reasigning values
    dx = dx < 0 ? -200 : 200;
    return vec2(randi(dx - 150, dx + 90), randi(dy - 400, dy + 400));
}//calculateVec

let bounce = (bomb, victim, radius) => {
    let dx = victim.pos.x - bomb.pos.x;
    let dy = victim.pos.y - bomb.pos.y;
    let distance = getDistance(bomb.pos, victim.pos);
    if (distance <= radius) {
        victim.move(vec2(dx, dy).scale(mod(distance - radius)));
    }//if

}//bounce

