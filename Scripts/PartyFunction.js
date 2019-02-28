// This script will add the Level and a Travel button to your party members
let $ = parent.$;

$('.travel').remove();
setInterval(function(){
	if ($('#newparty').length && $('.travel').length == 0){
		$('#newparty .gamebutton').each(function() {
			var player = $(this).attr('onclick').replace('party_click("', '').replace('")', '');

			// Display Levels on Party members
			for (var chars in parent.info.characters){
				var charName = parent.info.characters[chars].name;
				var level = parent.info.characters[chars].level;
				if (charName == player){
					$(this).append(`<div class="travel">LVL ${level}</div>`);
				}
			}
			$(this).find('hr').remove();
			$(this).append(`<hr><div data-value=${player} class="travel">Travel</div>`);
		});
		$('.travel').unbind().on('click', function(event) {
			player = $(this).data('value');
            game_log('Traveling to ' + player);
			smart_move(parent.party[player].x,parent.party[player].y);
		});
	}
}, 500);
