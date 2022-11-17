import kaboom from "kaboom";
kaboom();
export const createGameScene = (scene_id, level, level_options) => {
    /** 
    *@param {string} scene_id name of the scene
    **/
    scene(scene_id, 
          () => {
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

