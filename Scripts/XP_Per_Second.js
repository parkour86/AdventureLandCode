// This script displays how much XP you are getting per second
var startTime = new Date();
var startXP = character.xp;
var startLevel = character.level;

init_xpmeter();

setInterval(function() {
  update_xpmeter();
}, 1000);

function init_xpmeter() {
  let $ = parent.$;
  let brc = $('#bottomrightcorner');

  brc.find('#xptimer').remove();

  let xpt_container = $('<div id="xptimer"></div>').css({
    fontSize: '28px',
    color: 'white',
    textAlign: 'center',
    display: 'table',
    overflow: 'hidden',
    marginBottom: '-5px',
    width: "100%"
  });
	
  //vertical centering in css is fun
  let xptimer = $('<div id="xptimercontent"></div>')
    .css({
      display: 'table-cell',
      verticalAlign: 'middle'
    })
    .html("")
    .appendTo(xpt_container);

  brc.children().first().after(xpt_container);
}

function update_xpmeter()
{
	let $ = parent.$;
	var xp = getXP();
	var xpString = "<div>" + xp + " XP/Sec" + "</div>"; 
	
	$('#' + "xptimercontent").html(xpString).css({
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

function getXP() {
    // Start the XP over if player levels up
    if (character.level != startLevel){
        startTime = new Date();
        startXP = character.xp;
        startLevel = character.level;
    }else if (character.xp != startXP){
	var XPGained = character.xp-startXP;
        var elapsed = new Date() - startTime;
        var xpPerSecond = parseFloat(Math.round((XPGained/(elapsed/1000)) * 100) / 100);
        var xpPerHour = parseInt(xpPerSecond * 60 * 60).toLocaleString('en').replace(",","");
        return xpPerSecond;
	}
}





