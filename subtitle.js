$(window).load(function(){

var pop = Popcorn("#video");

var current=1;
var click=0;
var save=1;
var edit=1;

var jsonObj = []; //declare array


$("#sub").click(function(){
	var len=0;
	console.log(current);
	$("div.cont").each(function(i, elm) {
   		len++;
	});
	//$("#s").text(len);
	for (var i = 1; i <= len; i++) {
   		jsonObj.push({start: $("div[name='"+i+"']").children("span[name='a1']").children("span").text(),
					  end: $("div[name='"+i+"']").children("span[name='a2']").children("span").text(),
					  subt: $("div[name='"+i+"']").children("li").text()
					 });
		//$("#s").append($("div[name='"+i+"']").children("span[name='a1']").children("span").text());
	}
	console.log(jsonObj);
	save=1;
});

$(window).bind('beforeunload', function(){ 
	if (!save)
		return "You haven't saved the changes that you have done";
});

pop.on( "play",function(){
	//$("#s").text(current);
	if (edit){
	save=0;
	var mins = Math.round(Math.round(this.currentTime()) / 60);
	var secs = Math.round(this.currentTime()) % 60;
	$("div[name='"+current+"']").children("span[name='a1']").children("span").text(mins+":"+secs);
	}
});

pop.on( "pause",function(){
	//$("#s").text(current+"ppp");
	if (edit){
	save=0;
	var mins = Math.round(Math.round(this.currentTime()) / 60);
	var secs = Math.round(this.currentTime()) % 60;
	$("div[name='"+current+"']").children("span[name='a2']").children("span").text(mins+":"+secs);
	current=current+1;
	$("#s").text(current);
	$("div[name!='"+current+"']").css('background-color','#ffffff');
	$("div[name='"+current+"']").css('background-color','#eeeeee');
	$("div[name='"+(current+1)+"']").scrollintoview({duration: 1000,direction: "vertical"});
	}
});

$("#ply").click(function(){
	edit=0;
	//$("#s").text(pop.duration());
	$("div.cont").each(function(i, elm) {
			var n1=$("div[name='"+i+"']").children("span[name='a1']").children("span").text().split(":");
			var n2=$("div[name='"+i+"']").children("span[name='a2']").children("span").text().split(":");
			var sec1=n1[0]*60+n1[1];
			var sec2=n2[0]*60+n2[1];
   			pop.code({
				start: sec1,
				end: sec2,
				onStart: function( options ) {
         				document.getElementById( "footnote" ).innerHTML = $("div[name='"+i+"']").children("li").text();
				},
				onEnd: function( options ) {
						document.getElementById( "footnote" ).innerHTML = "";
				}
			});
	});
	pop.currentTime(0);
	pop.play();
});

$("#vid").click(function(){
	edit=1;
	pop = Popcorn("#video");
});

$("div[name='"+current+"']").css('background-color','#eeeeee');


$("div.cont").click(function(){
	current=parseInt($(this).attr('name'));
	$("#s").text(current);
	$("#s").text("asasdfffwef");
	$("div[name!='"+current+"']").css('background-color','#ffffff');
	$("div[name='"+current+"']").css('background-color','#eeeeee');
});

$("#scont").click(function() {
	save=0;
	pop.pause();
});

$("#new").click(function(){
	$("#inf").append('<div class="cont" name="7"><span style="text-align:left;"  
		name="a1">Start Time:<span></span></span><span style="float:right;" name="a2">End Time:<span></span></span>
		<li id="scont" contenteditable="true" spellcheck="false">Anything inside this div will be editable6!</li></div>');
});

});