var userDice = 'cross', compDice = 'zero';

/**************** check foor streight sequence *******************/
var checkEachSequence = function(eachSeqArr, DiceType) {
    // if both in sequencearr has same with DiceType, then return true
    // else false;
    if ($("#" + eachSeqArr[0]).hasClass(DiceType) && ($("#" + eachSeqArr[1]).hasClass(DiceType))) {
        return true;
    }
    return false;
};
var checkAllSequence = function(curXYPos, DiceType) {
    var posXYArr = curXYPos.split('-');
    // x axis wise loop to get other 2 td to create sequence
    var eachSequenceArr = [], eachSequenceIndex = 0;
    for (i = 1; i <= 3; i++) {
        if (curXYPos == (posXYArr[0] + '-' + i)) {
            continue;
        }

        eachSequenceArr[eachSequenceIndex++] = posXYArr[0] + '-' + i;
    }
    // call to check each sequence
    if (checkEachSequence(eachSequenceArr, DiceType)) {
        return true;
    }

    eachSequenceIndex = 0;
    for (i = 1; i <= 3; i++) {
        if (curXYPos == (i + '-' + posXYArr[1])) {
            continue;
        }

        eachSequenceArr[eachSequenceIndex++] = i + '-' + posXYArr[1];
    }
    // call to check each sequence : if true -> return true
    if (checkEachSequence(eachSequenceArr, DiceType)) {
        return true;
    }

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
    if (checkEachSequence(eachSequenceArr, DiceType)) {
        return true;
    }

    //for special position 2-2
    if ('2-2' == curXYPos) {
        eachSequenceArr = ["3-1", "1-3"];
        // call to check each sequence
        if (checkEachSequence(eachSequenceArr, DiceType)) {
            return true;
        }

        eachSequenceArr = ["1-1", "3-3"];
        // call to check each sequence
        if (checkEachSequence(eachSequenceArr, DiceType)) {
            return true;
        }
    }

    return false;
};

/*************  ************/

var compRunningZero = function() {
    // determine first placement.
    if (0 == $("td.zero").length) {
        if ($("#2-2").hasClass("cross")) {
            $("#1-1").removeClass("blank").addClass("zero");
        } else {
            $("#2-2").removeClass("blank").addClass("zero");
        }
    } else { // 2nd turn onwards
        var RuleFound = 0;

        // attacking rule - loop through blanks and check if comp can win
        $('#gameTable tr td.blank').each(function() {
            if (checkAllSequence(this.id, 'zero')) {
                $("#" + this.id).removeClass("blank").addClass("zero");
                alert('Comp win');
                RuleFound = 1;
                return false;
            }
        });

        // defending rule - loop through blanks and defend if user win possible
        if (0 == RuleFound) {
            $('#gameTable tr td.blank').each(function() {
                if (checkAllSequence(this.id, 'cross')) {
                    $("#" + this.id).removeClass("blank").addClass("zero");
                    RuleFound = 1;
                    return false;
                }
            });
        }

        // exceptional logic if above 2 dont work
        if (0 == RuleFound) {
            if($("#2-2").hasClass('zero')) { // zero in center
                // if corner and opposite is the position (determine this case)
                var Middle4Pos = new Object({"1-2":["3-1","3-3"], "2-1":["1-3","3-3"], "2-3":["1-1","3-1"], "3-2":["1-1","1-3"]}),
                        excludeList = [];
                $.each(Middle4Pos, function(key, val) {
                    if($("#"+key).hasClass('cross')) {
                        // find if any of opposite corner has values
                        $.each(val, function(i, eachCornerVal) {
                            if($("#"+eachCornerVal).hasClass('cross')) { // "2.5" combination found
                                var middlePosXYArr = key.split('-');
                                if(2 == middlePosXYArr[0]) {
                                    // if row of middle position is 2, dont touch the whole col of corner pos
                                    var cornerCol = eachCornerVal.split('-')[1];
                                    excludeList.push("1-"+cornerCol, "2-"+cornerCol, "3-"+cornerCol);
                                } else {
                                    // if col of middle position is 2, dont touch the whole row of corner pos
                                    var cornerRow = eachCornerVal.split('-')[0];
                                    excludeList.push(cornerRow+"-1", cornerRow+"-2", cornerRow+"-3");
                                }
                            }
                        });
                    }
                });
                // put zero excluding exclude list
                $('#gameTable tr td.blank').each(function() {
                    if (-1 === $.inArray(this.id, excludeList)) {
                        $("#" + this.id).removeClass("blank").addClass("zero");
                        RuleFound = 1;
                        return false;
                    }
                });

                // if cross is in opposite corner, put 0 in any middle box
                excludeList = [];
                if (0 == RuleFound) {
                    if($("#1-1").hasClass('cross') && $("#3-3").hasClass('cross')) {
                        excludeList.push("1-3", "3-1");
                    } else if($("#1-3").hasClass('cross') && $("#3-1").hasClass('cross')) {
                        excludeList.push("1-1", "3-3");
                    }
                    $('#gameTable tr td.blank').each(function() {
                        if (-1 === $.inArray(this.id, excludeList)) {
                            $("#" + this.id).removeClass("blank").addClass("zero");
                            RuleFound = 1;
                            return false;
                        }
                    });
                }
            }
        }

        // if nothing found till now, populate randomly
        if (0 == RuleFound) {
            $('#gameTable tr td.blank').each(function() {
                $("#" + this.id).removeClass("blank").addClass("zero");
                return false;
            });
        }
    }

};
var compRunningX = function() {
    // determine first placement.
    if (0 == $("td.cross").length) {
        // place cross in random place among 4 corners and middle
        var firstCrossAttackingPlacess = ['1-1', '1-3', '2-2', '3-1', '3-3'];
        var firstAttackingPos = firstCrossAttackingPlacess[Math.floor(Math.random() * firstCrossAttackingPlacess.length)];

        $("#"+firstAttackingPos).removeClass("blank").addClass("cross");
    } else if(1 == $("td.cross").length) { // 2nd chance
        // middle position is blank, select position, so that 3rd entry will be check mate
        if($("#2-2").hasClass('blank')) {
            var zeroId = $('#gameTable tr td.zero').attr('id');
            var crossId = $('#gameTable tr td.cross').attr('id');
            if(('1-1' == zeroId) || ('1-3' == zeroId) || ('3-1' == zeroId) || ('3-3' == zeroId)) { // if 0 is in corner
                switch(crossId) {
                    case '1-1':
                        if('3-3' == zeroId) {
                            $("#3-1").removeClass("blank").addClass("cross");
                        } else {
                            $("#3-3").removeClass("blank").addClass("cross");
                        }
                        break;
                    case '1-3':
                        if('3-1' == zeroId) {
                            $("#3-3").removeClass("blank").addClass("cross");
                        } else {
                            $("#3-1").removeClass("blank").addClass("cross");
                        }
                        break;
                    case '3-1':
                        if('1-3' == zeroId) {
                            $("#1-1").removeClass("blank").addClass("cross");
                        } else {
                            $("#1-3").removeClass("blank").addClass("cross");
                        }
                        break;
                    case '3-3':
                        if('1-1' == zeroId) {
                            $("#3-1").removeClass("blank").addClass("cross");
                        } else {
                            $("#1-1").removeClass("blank").addClass("cross");
                        }
                        break;
                }
            } else { // if 0 is in middle
//                // place either opposite corner or 2.5 box
//                var targetableBoxes = ['1-1', '1-2', '2-1'];
//                switch(crossId) {
//                    case '1-1':
//                        targetableBoxes = ['2-3', '3-2', '3-3'];
//                        break;
//                    case '1-3':
//                        targetableBoxes = ['2-1', '3-1', '3-2'];
//                        break;
//                    case '3-1':
//                        targetableBoxes = ['1-2', '1-3', '2-3'];
//                        break;
//                }
//                // loop through arr and take anyone which is blank
//                $(targetableBoxes).each(function() {
//                    if($("#"+this).hasClass('blank')) {
//                        $("#"+this).removeClass("blank").addClass("cross");
//                        return false;
//                    }
//                });
            }
        } else { // if 0 in middle


        }
    } else { // 3rd turn onwards
        var RuleFound = 0;

        // attacking rule - loop through blanks and check if comp can win
        $('#gameTable tr td.blank').each(function() {
            if (checkAllSequence(this.id, 'cross')) {
                $("#" + this.id).removeClass("blank").addClass("cross");
                alert('Comp win');
                RuleFound = 1;
                return false;
            }
        });

        // defending rule - loop through blanks and defend if user win possible
        if (0 == RuleFound) {
            $('#gameTable tr td.blank').each(function() {
                if (checkAllSequence(this.id, 'zero')) {
                    $("#" + this.id).removeClass("blank").addClass("cross");
                    RuleFound = 1;
                    return false;
                }
            });
        }

        // exceptional logic if above 2 dont work
//        if (0 == RuleFound) {
//            if($("#2-2").hasClass('zero')) { // zero in center
//                // if corner and opposite is the position (determine this case)
//                var Middle4Pos = new Object({"1-2":["3-1","3-3"], "2-1":["1-3","3-3"], "2-3":["1-1","3-1"], "3-2":["1-1","1-3"]}),
//                        excludeList = [];
//                $.each(Middle4Pos, function(key, val) {
//                    if($("#"+key).hasClass('cross')) {
//                        // find if any of opposite corner has values
//                        $.each(val, function(i, eachCornerVal) {
//                            if($("#"+eachCornerVal).hasClass('cross')) { // "2.5" combination found
//                                var middlePosXYArr = key.split('-');
//                                if(2 == middlePosXYArr[0]) {
//                                    // if row of middle position is 2, dont touch the whole col of corner pos
//                                    var cornerCol = eachCornerVal.split('-')[1];
//                                    excludeList.push("1-"+cornerCol, "2-"+cornerCol, "3-"+cornerCol);
//                                } else {
//                                    // if col of middle position is 2, dont touch the whole row of corner pos
//                                    var cornerRow = eachCornerVal.split('-')[0];
//                                    excludeList.push(cornerRow+"-1", cornerRow+"-2", cornerRow+"-3");
//                                }
//                            }
//                        });
//                    }
//                });
//                // put zero excluding exclude list
//                $('#gameTable tr td.blank').each(function() {
//                    if (-1 === $.inArray(this.id, excludeList)) {
//                        $("#" + this.id).removeClass("blank").addClass("zero");
//                        RuleFound = 1;
//                        return false;
//                    }
//                });
//
//                // if cross is in opposite corner, put 0 in any middle box
//                excludeList = [];
//                if (0 == RuleFound) {
//                    if($("#1-1").hasClass('cross') && $("#3-3").hasClass('cross')) {
//                        excludeList.push("1-3", "3-1");
//                    } else if($("#1-3").hasClass('cross') && $("#3-1").hasClass('cross')) {
//                        excludeList.push("1-1", "3-3");
//                    }
//                    $('#gameTable tr td.blank').each(function() {
//                        if (-1 === $.inArray(this.id, excludeList)) {
//                            $("#" + this.id).removeClass("blank").addClass("zero");
//                            RuleFound = 1;
//                            return false;
//                        }
//                    });
//                }
//            }
//        }

        // if nothing found till now, populate randomly
        if (0 == RuleFound) {
            $('#gameTable tr td.blank').each(function() {
                $("#" + this.id).removeClass("blank").addClass("cross");
                return false;
            });
        }
    }

};
















var checkComplition = function() { //check all image position if any sequence completed

}
var bindGame = function() {

};







$(document).ready(function() {
    compRunningX();
    $('#gameTable tr td').on('click', function() {
        if($(this).hasClass('blank')) {
            $("#" + this.id).removeClass("blank").addClass("zero");

            if (checkAllSequence(this.id, 'zero')) {
                alert('You win');
                return false;
            }

            compRunningX();
        }
    });


//    $('#gameTable tr td').on('click', function() {
//        if($(this).hasClass('blank')) {
//            $("#" + this.id).removeClass("blank").addClass("cross");
//
//            if (checkAllSequence(this.id, 'cross')) {
//                alert('You win');
//                return false;
//            }
//
//            compRunningZero();
//        }
//    });
});