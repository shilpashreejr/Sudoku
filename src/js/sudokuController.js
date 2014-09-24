$(document).ready(function () {

    var sudokuBoard = SUDOKU_MODEL.generateBoardValues();

    SUDOKU_VIEW.createBoard(sudokuBoard);

    $('#sudokuTable').delegate("input", "keyup", function () {
        var rowIndex = $(this).closest("tr").index(),
            colIndex = $(this).closest("td").index(),
            isValid = SUDOKU_MODEL.isValidNumber($(this).val(), rowIndex, colIndex),
            isValueAdded;

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

    $('#buttonGrp').delegate('button', 'click', function () {
        if ($(this).text() === 'SOLVE THE BOARD') {
            $('#sudokuTable input').removeClass('errorState');
            var solvedBoard = SUDOKU_MODEL.solve();
            if (solvedBoard != false) {
                SUDOKU_VIEW.solvedBoard('#sudokuTable input', solvedBoard);
            }
        } else if ($(this).text() === 'RESET THE BOARD') {
            $('#sudokuTable input').val('');
            $('#sudokuTable input').removeClass('errorState');
            var resetBoardValues = SUDOKU_MODEL.resetBoardValues();
            SUDOKU_VIEW.solvedBoard('#sudokuTable input', resetBoardValues);
        }

    });

});