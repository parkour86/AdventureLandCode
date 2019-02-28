// Auto Upgrade Script
// Place item to be upgraded into slot 0

// Change this to the level you want your item to be at
let maxLevel = 7;
let itemSlot = 0;

// Store the json of the item to be upgraded
let upgradeItem = character.items[itemSlot];

var prices =
	{
		helmet:3200,
		shoes:12100,
		gloves:3400,
		pants:7800,
		coat:6000,
		blade:8400,
		wshield:4800
	};

// Exit if item is not in slot 0
if (!upgradeItem) {
	throw new Error("Please place item in slot 0 to be upgraded");
}

var totalSpent = prices[upgradeItem.name];

game_log("--------------");
game_log("Start Upgrading");
game_log("--------------");
// Store the level of the item to be upgraded
var StartLevel = upgradeItem.level;
// Loop over the buy/upgrades until item is at maxLevel or breaks
var breakLoop = setInterval(function(){
	var scrollSlot = -1;
	// Store the json of the item to be upgraded
	upgradeItem = character.items[itemSlot];
	//game_log("i "+i);
	// Exit the function if the item is gone
	if (!upgradeItem){ game_log("Item Gone"); window.clearInterval(breakLoop); }
	// Store the level of the item to be upgraded
	var level = upgradeItem.level;
	//game_log("level "+level)
	// Exit the function if the item is at the maxLevel
	if (level == maxLevel){ game_log("MaxLevel Reached"); window.clearInterval(breakLoop); }
	// Store the grades of the item to determine which scroll to use
	var grade = get_grade(upgradeItem);
	// Buy a low tear scroll if it's less than the grade value
	if (level < grade[0]-1){
		scrollSlot = buy_scroll("scroll0");
	}else if (level < grade[1]){
		scrollSlot = buy_scroll("scroll1");
	}

	if (scrollSlot != -1){
		//game_log("Upgrading "+upgradeItem.name)
		upgrade(itemSlot, scrollSlot);
		//game_log("item should be level "+parseInt(level+1));
		game_log("Total Spent: "+totalSpent)
		game_log("--");
	}
}, 1000);

function buy_scroll(item) {
	// Check if user has a scroll
	var scrollSlot = find_slot(item);
	if (scrollSlot == -1){
		//game_log("Buying "+item)
		buy_with_gold(item,1);
		itemValue = (item == "scroll0") ? 1000 : 40000;
		totalSpent = parseInt(totalSpent + itemValue);
		// Get the slot of the scroll
		return find_slot(item);
	}else{
		//game_log("Scroll in slot "+scrollSlot)
		return scrollSlot;
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

function get_grade(item) {
  return parent.G.items[item.name].grades;
}
