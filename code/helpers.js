import kaboom from "kaboom";
// kaboom();
export const createGameScene = (scene_id, level, level_options, time_left = "00:00") => {
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

            addLevel(
                level,
                level_options,
            );//addLevel

            // Todo: add score board
            // Todo: add health score
            // Todo: add time left
            // add bombs count
            // add powers count
            // Todo add points
        }//scene def
    );//scene
}//createGameScene

