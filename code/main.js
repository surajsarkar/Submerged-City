import kaboom from "kaboom";

import {createGameScene} from "./helpers";
import {LEVEL_1} from "./level"


// initialize context
kaboom();

createGameScene("level_one", LEVEL_1, {width:1428, height: 612},);

go("level_one");