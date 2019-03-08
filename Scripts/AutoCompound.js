// Auto Compound Script

// Change this to the level you want your item to be at
let maxLevel = 2;

var hpamulet_loc = [ [], [], [] ];
var ringsj_loc = [ [], [], [] ];
var hpbelt_loc = [ [], [], [] ];
var cscroll0_loc = -1;
var length;

// Store the slot number of the items
for (let i = 0; i < character.items.length; i++) {
	var item = character.items[i];
	if (item && item.level <= maxLevel){
		switch (item.name){
			case "hpamulet":
				length = hpamulet_loc[item.level].length;
				hpamulet_loc[item.level][length] = i;
				//game_log("hpamulet "+i+" "+hpamulet_cnt)
				break;
			case "ringsj":
				length = ringsj_loc[item.level].length;
				ringsj_loc[item.level][length] = i;
				//.game_log("ringsj S"+i+" L"+item.level+" "+length)
				break;
			case "hpbelt":
				length = hpbelt_loc[item.level].length;
				hpbelt_loc[item.level][length] = i;
				//game_log("hpbelt "+i+" "+hpbelt_cnt)
				break;
		}
	}
}

function compound(item_loc) {
	//game_log(item_loc)
	for (let m = 0; m < maxLevel; m++){
		for (let i = 0; i < item_loc.length; i++){
			for (let j = 0; j < floor(item_loc[i].length/3)*3;j+=3){
				// Get the location of the scrolls
				cscroll0_loc = find_slot("cscroll0");
				// Buy scroll if none in inventory
				if (cscroll0_loc == -1){
					buy_with_gold("cscroll0",10);
					cscroll0_loc = find_slot("cscroll0");
				}else{
					// Compound the items
					//compound(item_loc[i][j],item_loc[i][j+1],item_loc[i][j+2],cscroll0_loc);
					game_log("compound("+item_loc[i][j]+", "+item_loc[i][j+1]+", "+item_loc[i][j+2]+", "+cscroll0_loc+")")
					parent.c_items = [item_loc[i][j],item_loc[i][j+1],item_loc[i][j+2]];
					parent.c_last = 3;
					parent.c_scroll = cscroll0_loc;
					parent.compound();
				}
			}
		}
	}
}

function find_slot(s){
	for (let i = 0; i < character.items.length; i++) {
		var item = character.items[i];
		if (item && item.name == s){
			return i;
		}
	}
	return -1;
}

compound(hpamulet_loc);
compound(ringsj_loc);
compound(hpbelt_loc);
