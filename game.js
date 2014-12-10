var ximg = "media/image1/orig.jpeg",
    oimg = "media/image2/orig.jpeg";

var checkEachSequence = function(eachSeqArr, DiceType) {
    // if both in sequencearr has same with DiceType, then return true
    // else false;
    console.log(eachSeqArr);
    return false;
};
var checkAllSequence = function(curXYPos, DiceType) {
    var posXYArr = curXYPos.split('-');
    // x axis wise loop to get other 2 td to create sequence
    var eachSequenceArr, eachSequenceIndex = 0;
    for (i=1; i<=3;i++) {
        if (curXYPos == (posXYArr[0]+'-'+i)) { continue; }
        
        eachSequenceArr[eachSequenceIndex++] = posXYArr[0]+'-'+i;
    }
// call to check each sequence
if(checkEachSequence(eachSequenceArr, DiceType)) { return true; }
    
    eachSequenceIndex = 0;
    for (i=1; i<=3;i++) {
        if (curXYPos == (i+'-'+posXYArr[0])) { continue; }
        
        eachSequenceArr[eachSequenceIndex++] = i+'-'+posXYArr[0];
    }
// call to check each sequence : if true -> return true
if(checkEachSequence(eachSequenceArr, DiceType)) { return true; }
    
    // add checking for corner positions
    switch (curXYPos) {
        case '1-1':
            eachSequenceArr = ["2-2", "3-3"];
            break;
        case '3-3':
            eachSequenceArr = ["1-1", "2-2"];
            break;
        case '1-3':
            eachSequenceArr = ["2-2", "3-1"];
            break;
        case '3-1':
            eachSequenceArr = ["2-2", "1-3"];
            break;
    }
// call to check each sequence
if(checkEachSequence(eachSequenceArr, DiceType)) { return true; }

    //for special position 2-2
    if (curXYPos) {
        eachSequenceArr = ["3-1", "1-3"];
// call to check each sequence
if(checkEachSequence(eachSequenceArr, DiceType)) { return true; }
        eachSequenceArr = ["1-1", "3-3"];
// call to check each sequence
if(checkEachSequence(eachSequenceArr, DiceType)) { return true; }
    }
    
    return false;
}


var checkComplition = function() { //check all image position if any sequence completed
    //var currentSeries = '';
    //$('#gameTable tr td').each(function() {
    //    currentSeries += $(this).find("img").attr('id') + '-';
    //});
    //
    //if (currentSeries == correctImageSeries) {
    //    $("#td_" + noOfBoxes).html('<img id="img_' + noOfBoxes + '" src="media/' + imgDirName + '/' + noOfBoxes + '/img' + noOfBoxes + '.jpeg" />');
    //    $("#" + getBlankTdId()).removeClass('blank');
    //    setGameImageStyle();
    //    stopTimer();
    //    $("#opMsg").show();
    //}
}
var bindGame = function() {
    //$("td").click(function(data) {
    //    var currentTdId = $(data.currentTarget).attr('id');
    //    var blankTdId = getBlankTdId();
    //
    //    if (-1 < $.inArray(blankTdId, eval("assoc_" + currentTdId))) {
    //        // move image
    //        $("#" + blankTdId).html($("#" + currentTdId).html());
    //        $("#" + currentTdId).html('');
    //        $("#" + blankTdId).removeClass('blank');
    //        $("#" + currentTdId).addClass('blank');
    //        checkComplition();
    //    }
    //});
    //startTimer();
}





//var changeLevel = function(level, elem) {
//    if (confirm("Are you sure? You will loose all the current progress.")) {
//        resetTimer();
//        $(".change-game button").show();
//        $(elem).hide();
//
//        $("#opMsg").hide();
//        gameLevel = level;
//        $("#show-current-level").html(gameLevel);
//        setNoOfBoxes();
//        createAssocTdList();
//        arrange();
//        setGameImageStyle();
//        $("#start-button").show();
//    }
//}

$(document).ready(function() {
    //$("#btn-easy").hide();
    //$("#show-current-level").html(gameLevel);
    //setNoOfBoxes();
    //createAssocTdList();
    //
    //$("#ch-img-button").click(function() {
    //    changeImage();
    //});
    //$("#btn-easy").click(function(event) {
    //    changeLevel('easy', event.target);
    //});
    //$("#btn-moderate").click(function(event) {
    //    changeLevel('moderate', event.target);
    //});
    //$("#start-button").click(function() {
    //    randomize();
    //});
    //$("#display-imgs img").click(function(event) {
    //    selectImage(event.target.id);
    //});
});