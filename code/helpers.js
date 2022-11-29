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
            play("underocean", { loop: true, volume: 0.4 });

            let [score_board, container_text] = textbox(
                box_width = 250,
                box_height = 50,
                outline_width = 2,
                box_color = color(255, 125, 0),
                initial_text = `Time Left: ${time_left}`,
                text_x_pad = 10,
                text_y_pad = 15,
                font = "sink",
                font_size = 18,
                x_cor = 10,
                y_cor = 10,
            );

            let [bomb_counter, bomb_count_sprite, bomb_count_label] = infoBoard(
                sprite_tag = "bomb",
                sprite_pad_x = 5,
                sprite_pad_y = 5,
                initial_text = bomb_count,
                box_width = 80,
                box_height = 50,
                x_cor = score_board.pos.x + 260,
                y_cor = 10,
                text_pad_x = 55,
                text_pad_y = 10,
                font = "sink",
                font_size = 30,
                outline_width = 2,
                box_color = [255, 125, 0],

            );//player health board

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

            let [p_hel_box, p_hel_sprite, p_hel_label] = infoBoard(
                sprite_tag = "grass",
                sprite_pad_x = 5,
                sprite_pad_y = 5,
                initial_text = player.hp(),
                box_width = 110,
                box_height = 50,
                x_cor = bomb_counter.pos.x + 90,
                y_cor = 10,
                text_pad_x = 55,
                text_pad_y = 15,
                font = "sink",
                font_size = 18,
                outline_width = 2,
                box_color = [255, 125, 0],

            );//player health board

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
                        play("blastsound", { loop: false, volume: 0.5, speed: 2, seek: 0 });

                        wait(0.27, () => {

                            addKaboom(bomb.pos);
                            // destroying fish inside the radius of 84
                            every("fish", (fish) => {
                                if (getDistance(bomb.pos, fish.pos) < 84) {
                                    destroy(fish);
                                }//if
                            });//every

                            let player_bomb_distance = getDistance(player.pos, bomb.pos);


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
                // update user health point 
                p_hel_label.text = player.hp();

                //update bomb count 
                bomb_count_label.text = bomb_count;

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

let infoBoard = (
    sprite_tag,
    sprite_pad_x,
    sprite_pad_y,
    initial_text,
    box_width,
    box_height,
    x_cor,
    y_cor,
    text_pad_x,
    text_pad_y,
    font = "sink",
    font_size = 18,
    outline_width = 2,
    box_color = [255, 0, 0],
) => {
    let board = add([
        rect(w = box_width, h = box_height),
        pos(x_cor, y_cor),
        outline(outline_width),
        color(box_color[0], box_color[1], box_color[2]),
    ]);//board

    let logo = add([
        sprite(sprite_tag),
        pos(board.pos.x + sprite_pad_x, board.pos.y + sprite_pad_y),
    ])

    let info = add([
        text(initial_text, { font: font, size: font_size }),
        pos(board.pos.x + text_pad_x, board.pos.y + text_pad_y),
    ]);//info

    return [board, sprite, info];

}//infoBoard


let textbox = (
    box_width,
    box_height,
    outline_width,
    box_color,
    initial_text,
    text_x_pad,
    text_y_pad,
    font,
    font_size,
    x_cor,
    y_cor,
) => {
    let text_box = add([
        rect(box_width, box_height),
        box_color,
        pos(10, 10),
        outline(outline_width),
    ]);

    let box_text =  add([
        text(initial_text, {size: font_size, font: font}),
        pos(text_box.pos.x + text_x_pad, text_box.pos.y + text_y_pad),
    ]);

    return [text_box, box_text];
}//textbox