$(document).ready(function () {

    var sudokuBoard = SUDOKU_MODEL.generateBoardValues();

    SUDOKU_VIEW.createBoard(sudokuBoard);

    $('#sudokuTable').delegate("input", "change", function () {
        var isValid = SUDOKU_MODEL.isValidNumber($(this).val()),
            trIndex = $(this).closest("tr").index(),
            tdIndex = $(this).closest("td").index();

        if (!isValid) {
            $(this).val('');
        }

    });

});