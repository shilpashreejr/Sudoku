$(document).ready(function () {

    var sudokuBoard = SUDOKU_MODEL.generateBoardValues();

    SUDOKU_VIEW.createBoard(sudokuBoard);

    $('#sudokuTable').delegate("input", "change", function () {
        var rowIndex = $(this).closest("tr").index(),
            colIndex = $(this).closest("td").index(),
            isValid = SUDOKU_MODEL.isValidNumber($(this).val(), rowIndex, colIndex);

        if (!isValid) {
            $(this).val('');
        }

    });

    $('#sudokuSolver').on('click', function () {
        SUDOKU_MODEL.solve();
    });

});