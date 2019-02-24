// This script displays the Days, Hours, Minutes and Seconds of when you will next level up.
var startTime_levelup = new Date();
var startXP_levelup = character.xp;
var startLevel_levelup = character.level;

init_xplevelmeter();

setInterval(function() {
  update_xplevelmeter();
}, 1000);

function init_xplevelmeter() {
  let $ = parent.$;
  let brc = $('#bottomrightcorner');

  brc.find('#levelUpTimer').remove();

  let xplevelt_container = $('<div id="levelUpTimer"></div>').css({
    fontSize: '28px',
    color: 'white',
    textAlign: 'center',
    display: 'table',
    overflow: 'hidden',
    marginBottom: '-5px',
	width: "100%"
  });
	
  //vertical centering in css is fun
  let xpleveltimer = $('<div id="xplevelupcontent"></div>')
    .css({
      display: 'table-cell',
      verticalAlign: 'middle'
    })
    .html("")
    .appendTo(xplevelt_container);

  brc.children().first().after(xplevelt_container);
}

function update_xplevelmeter()
{
	let $ = parent.$;
	var xp_levelup = getLevelUpXP() || 0;
	var xpLevelString = "<div>Next Level Up:<br>" + xp_levelup + "</div>"; 
	
	$('#' + "xplevelupcontent").html(xpLevelString).css({
        background: 'black',
        border: 'solid gray',
        borderWidth: '5px 5px',
        height: '34px',
        lineHeight: '34px',
        fontSize: '30px',
        color: 'green',
        textAlign: 'center',
      });
}

function getLevelUpXP() {
    // Start the XP over if player levels up
    if (character.level != startLevel_levelup){
        startTime_levelup = new Date();
        startXP_levelup = character.xp;
        startLevel_levelup = character.level;
    }else if (character.xp != startXP_levelup){
		var XPGained_levelup = character.xp-startXP_levelup;
        var elapsedTime = new Date() - startTime_levelup;
        var xpPerSecond_levelup = parseFloat(Math.round((XPGained_levelup/(elapsedTime/1000)) * 100) / 100);
        var xpPerHour_levelup = parseInt(xpPerSecond_levelup * 60 * 60).toLocaleString('en').replace(",","");
        var hoursToLevel = parseInt((character.max_xp-character.xp)/xpPerHour_levelup);
        var secondsToLevel = parseInt((character.max_xp-character.xp)/xpPerSecond_levelup);
        return ConvertHours(secondsToLevel);
	}
}

function ConvertHours(seconds){
    d = Math.floor(seconds / 86400); // seconds/1440
    h = Math.floor((seconds % 86400) / 3600); //(seconds-(d*1440))/60
    m = Math.round(((seconds % 86400) % 3600) / 60); //seconds%60
    s = Math.round(((seconds % 86400) % 3600) % 60);

    if(d > 0){
        return (`${d} days, ${h} hours, ${m} minutes`)
    }else if (h > 0){
        return (`${h} hours, ${m} minutes`)
    }else if (m > 0){
        return (`${m} minutes, ${s} seconds`)
    }else{
        return (`${s} seconds`)
    }
}
