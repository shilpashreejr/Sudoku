$(document).ready(function () {
    /* This is the main entry point. This communicates between the 
     * SUDOKU_MODEL and SUDOKU_VIEW.
     *
     * A call for generating a board values, creating a table,
     * and also manages the board.
     */
    var sudokuBoard = SUDOKU_MODEL.generateBoardValues(),
        rowIndex,
        colIndex,
        isValueAdded,
        isValid,
        solvedBoard,
        resetBoardValues;

    SUDOKU_VIEW.createBoard(sudokuBoard);

    $('#sudokuTable').delegate("input", "keyup", function () {
        rowIndex = $(this).closest("tr").index();
        colIndex = $(this).closest("td").index();
        isValid = SUDOKU_MODEL.isValidNumber($(this).val(), rowIndex, colIndex);

        if ($(this).val() === '') {
            SUDOKU_VIEW.removeErrorState($(this));
            SUDOKU_MODEL.removeValue(rowIndex, colIndex);
        }

        if (!isValid) {
            $(this).val('');
        } else {
            isValueAdded = SUDOKU_MODEL.isValueAdded($(this).val(), rowIndex, colIndex);
            if (isValueAdded) {
                SUDOKU_VIEW.removeErrorState($(this));
            } else {
                SUDOKU_VIEW.showError($(this));
            }

        }

    });

    $('.buttonGrp').delegate('button', 'click', function () {
        if ($(this).text() === 'SOLVE THE BOARD') {
            $('#sudokuTable input').removeClass('errorState');
            solvedBoard = SUDOKU_MODEL.solve();
            if (solvedBoard != false) {
                SUDOKU_VIEW.solvedBoard('#sudokuTable input', solvedBoard);
            } else {
                SUDOKU_VIEW.showErrorMsg();
            }
        } else if ($(this).text() === 'RESET THE BOARD') {
            $('#sudokuTable input').val('');
            $('#sudokuTable input').removeClass('errorState');
            resetBoardValues = SUDOKU_MODEL.resetBoardValues();
            SUDOKU_VIEW.solvedBoard('#sudokuTable input', resetBoardValues);
        }

    });

});