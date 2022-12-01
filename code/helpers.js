import kaboom from "kaboom";
// kaboom();
export const createGameScene = (scene_id,
    level,
    level_options,
    time_left = "00:00",
    bomb_count = 0,
    points_collected=0
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
                text_x_pad = 0,
                text_y_pad = 0,
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

            let [coins_counter, coins_logo_sprite, coins_count_label] = infoBoard(
                sprite_tag = "bomb",
                sprite_pad_x = 5,
                sprite_pad_y = 5,
                initial_text = points_collected,
                box_width = 150,
                box_height = 50,
                x_cor = p_hel_box.pos.x + 120,
                y_cor = 10,
                text_pad_x = 55,
                text_pad_y = 10,
                font = "sink",
                font_size = 30,
                outline_width = 2,
                box_color = [255, 125, 0],

            );//coins collected

            // add coin every 2 sec in random place 
            loop(1, ()=>{
                let point = add([
                    sprite("grass"),
                    pos(randi(10, width()), randi(10, height())),
                    area(),
                    "points",
                ]);//point
                
                wait(7, ()=>destroy(point));//wait
            });//loop

            // player collision with coin
            player.onCollide("points", (collection)=>{
                destroy(collection);
                points_collected += 10;
            });//collision with coin
            
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
                                player.hurt(Math.floor(hurt_amount > 0 ? hurt_amount : mod(hurt_amount)));
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

                // update points 
                coins_count_label.text = points_collected;
                
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

            let health_button = add([
                sprite('bomb'),
                area({cursor: "pointer"}),
                pos(width() - 80, height() - 80),
            ]);//health_button

            health_button.onClick(()=>{
                health_point = player.hp();
                if (health_point + 2 <= 100 && points_collected >= 10){
                    player.hurt(-2);
                    points_collected -= 10
                }//if
            });
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
        pos(x_cor, y_cor),
        outline(outline_width),
    ]);

    let box_text = add([
        text(initial_text, { size: font_size, font: font }),
        pos(text_box.pos.x+ text_x_pad, text_box.pos.y + text_y_pad),
    ]);

    return [text_box, box_text];
}//textbox



let addButton = (txt, font_size, position, func) => {
    let btn = add([
        text(txt, {size: font_size}),
        position,
        area({cursor: "pointer"}),
        scale(1),
    ])
    btn.onClick(func);
    return btn;
}//addButton



export const winLooseScene = (scene_id) => {
    scene(
        scene_id,
        (msg, points, bonus, have_next_level, next_level, poster) => {
            let [message_box, message] = textbox(box_width=500,
                                                box_height=70,
                                                outline_width=2,
                                                box_color=color(65, 125, 225),
                                                initial_text=msg,
                                                text_pad_x=10,
                                                text_pad_y=15,
                                                font="sink",
                                                font_size=40,
                                                x_cor=center().x - 250,
                                                y_cor=40,
                                                );

            let [points_box, points_collected] = textbox(box_width=450,
                                                box_height=70,
                                                outline_width=2,
                                                box_color=color(65, 125, 225),
                                                initial_text=`Earnings: ${points}`,
                                                text_pad_x=10,
                                                text_pad_y=15,
                                                font="sink",
                                                font_size=40,
                                                x_cor=message_box.pos.x + 250,
                                                y_cor=message_box.pos.y + 80
                                                );

            let [bonus_box, bonus_collected] = textbox(box_width=450,
                                                box_height=70,
                                                outline_width=2,
                                                box_color=color(65, 125, 225),
                                                initial_text=`Bonus: ${bonus}`,
                                                text_pad_x=10,
                                                text_pad_y=15,
                                                font="sink",
                                                font_size=40,
                                                x_cor=message_box.pos.x + 250,
                                                y_cor=points_box.pos.y + 80,
                                                );

            let [total_box, total_points] = textbox(box_width=450,
                                                box_height=70,
                                                outline_width=2,
                                                box_color=color(65, 125, 225),
                                                initial_text=`Total: ${bonus + points}`,
                                                text_pad_x=10,
                                                text_pad_y=15,
                                                font="sink",
                                                font_size=40,
                                                x_cor=message_box.pos.x + 250,
                                                y_cor=bonus_box.pos.y + 80,
                                                );

        add([
            sprite(poster),
            pos(message_box.pos.x -300, message_box.pos.y + 80),
            scale(1),
        ])

            if (have_next_level){
                let next_level_bth = addButton(
                    "Next Level ->",
                    35,
                    pos(total_box.pos.x - 130, total_box.pos.y + 80), 
                    ()=>go(next_level));
            }//if
        }
    );//scene
}//winLooseScene