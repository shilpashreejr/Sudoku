SUDOKU_MODEL = (function () {

    var _currentBoardValues = [],
        _originalBoardValues = [],
        _sectionValues = [],
        _columnValues = [],
        _rowValues = [];

    var generateBoardValues = function () {
            var boardvalues = [
                2, 0, 0, 0, 0, 7, 0, 0, 0,
                0, 5, 0, 0, 2, 0, 0, 1, 0,
                0, 3, 0, 0, 8, 0, 0, 7, 0,
                0, 0, 5, 7, 0, 0, 0, 0, 2,
                1, 0, 0, 0, 0, 0, 0, 0, 3,
                9, 0, 0, 0, 0, 6, 1, 0, 0,
                0, 2, 0, 0, 7, 0, 0, 8, 0,
                0, 8, 0, 0, 9, 0, 0, 5, 0,
                0, 0, 0, 4, 0, 0, 0, 0, 6
            ];

            _getCurrentBoard(boardvalues);
            _originalBoardValues = _currentBoardValues;

            return boardvalues;
        },

        findIndex = function (row, column) {
            var sectRow = Math.floor(row / 3),
                sectCol = Math.floor(column / 3);

            if (sectRow == 0 && sectCol == 0)
                return 0;
            else if (sectRow == 0 && sectCol == 1)
                return 1;
            else if (sectRow == 0 && sectCol == 2)
                return 2;
            else if (sectRow == 1 && sectCol == 0)
                return 3;
            else if (sectRow == 1 && sectCol == 1)
                return 4;
            else if (sectRow == 1 && sectCol == 2)
                return 5;
            else if (sectRow == 2 && sectCol == 0)
                return 6;
            else if (sectRow == 2 && sectCol == 1)
                return 7;
            else if (sectRow == 2 && sectCol == 2)
                return 8;
        },

        _isValidTypeRange = function (inputVal) {
            var isType = $.isNumeric(inputVal);
            if ((inputVal > 0 && inputVal <= 9) && isType) {
                isValidType = true;
                return isValidType;
            }
        },

        _getCurrentBoard = function (boardvalues) {
            for (var i = 0, row = 0, col = 0; i < 81; i++) {
                if (col === 0) {
                    _currentBoardValues[row] = [];
                }
                _currentBoardValues[row][col] = boardvalues[i];
                col++;
                if (col === 9) {
                    row = row + 1;
                    col = 0;
                }
            }
            _updateBoardValues(_currentBoardValues);

            return _currentBoardValues;
        },

        _updateBoardValues = function (_currentBoardValues) {

            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (_currentBoardValues[i][j] === 0)
                        continue;

                    /* row values */
                    if (_rowValues[i] === undefined) {
                        _rowValues[i] = [];
                    }
                    _rowValues[i][_rowValues[i].length] = _currentBoardValues[i][j];

                    /* column values */
                    if (_columnValues[j] === undefined) {
                        _columnValues[j] = [];
                    }
                    _columnValues[j][_columnValues[j].length] = _currentBoardValues[i][j];

                    /* section values */
                    index = findIndex(i, j);
                    if (_sectionValues[index] == undefined) {
                        _sectionValues[index] = [];
                    }
                    _sectionValues[index][_sectionValues[index].length] = _currentBoardValues[i][j];
                }
            }

            return _currentBoardValues;
        },

        _validateAndAddNumber = function (inputVal, rowIndex, colIndex) {
            var index = findIndex(rowIndex, colIndex);

            if (
                (_rowValues[rowIndex].indexOf(inputVal) === -1) &&
                (_columnValues[colIndex].indexOf(inputVal) === -1) &&
                (_sectionValues[index].indexOf(inputVal) === -1)
            ) {
                isValid = true;
                _currentBoardValues[rowIndex][colIndex] = inputVal;
                _rowValues[rowIndex][_rowValues[rowIndex].length] = inputVal;
                _columnValues[colIndex][_columnValues[colIndex].length] = inputVal;
                _sectionValues[index][_sectionValues[index].length] = inputVal;
            } else {
                isValid = false;

            }

            return isValid;
        },

        isValidNumber = function (inputVal, rowIndex, colIndex) {

            var isValidType = _isValidTypeRange(inputVal);

            if (isValidType) {
                _validateAndAddNumber(parseInt(inputVal), rowIndex, colIndex);
            }

            return isValidType;
        },

        solve = function () {

            if (_solveInternal()) {
                _currentBoardValues;
            }

        },

        _solveInternal = function () {
            /*
            solve(game):
                if (game board is full)
                    return SUCCESS
                else
                    next_square = getNextEmptySquare()
                        for each value that can legally be put in next_square
                            put value in next_square (i.e. modify game state)
                            if (solve(game)) return SUCCESS
                            remove value from next_square (i.e. backtrack to a previous state)
                        return FAILURE
            */

            if (_isGameComplete())
                return true;

            //find Empty square
            var emptyRow = -1,
                emptyCol = -1;
            // for (var i = 0; i < 9; i++) {
            //     for (var j = 0; j < 9; j++) {
            //         if (_currentBoardValues[i][j] == 0) {
            //             emptyRow = i;
            //             emptyCol = j;
            //             break;
            //         }
            //     }
            //     if (i != -1) {
            //         break;
            //     }
            // }

            for (var i = 0; i < 81; i++) {
                var walkingRow = Math.floor(i / 9),
                    walkingCol = i % 9;
                if (_currentBoardValues[walkingRow][walkingCol] === 0) {
                    //found = true;
                    emptyRow = walkingRow;
                    emptyCol = walkingCol;
                    break;
                }
            }

            //try each available number
            var availNums = _getAvailableNumbers(emptyRow, emptyCol);
            for (var i = 0; i < availNums.length; i++) {

                var curVal = availNums[i];

                _validateAndAddNumber(curVal, emptyRow, emptyCol);

                if (solve()) {
                    return true;
                }

                _currentBoardValues[emptyRow][emptyCol] = 0;

            }
            return false;
        },

        _getAvailableNumbers = function (row, col) {
            var availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var index = findIndex(row, col);
            availableNums = removeExistingElements(availableNums, row, col, index);

            return availableNums;
        },

        _isGameComplete = function () {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (_currentBoardValues[i][j] == 0) {
                        return false;

                    }
                }
            }
            return true;
        }

    removeExistingElements = function (firstArray, row, col, index) {
        console.log('INITIAL  -- firstArray-->', firstArray);
        console.log('Before ROW', _rowValues[row]);

        for (var i = 0; i < _rowValues.length; i++) {
            val = Number(_rowValues[row][i]);
            if (val > 0) {
                // Remove from array
                if (firstArray.indexOf(val) > -1) {
                    firstArray.splice(firstArray.indexOf(val), 1);
                }
            }
        }
        console.log('After ROW-- firstArray-->', firstArray);

        console.log('Before _columnValues--', _columnValues[col]);
        for (var i = 0; i < _columnValues.length; i++) {
            val = Number(_columnValues[col][i]);
            if (val > 0) {
                // Remove from array
                if (firstArray.indexOf(val) > -1) {
                    firstArray.splice(firstArray.indexOf(val), 1);
                }
            }
        }
        console.log('After column-- firstArray-->', firstArray);

        console.log('Before section', _sectionValues[index]);
        for (var i = 0; i < _sectionValues.length; i++) {
            val = Number(_sectionValues[index][i]);
            if (val > 0) {
                // Remove from array
                if (firstArray.indexOf(val) > -1) {
                    firstArray.splice(firstArray.indexOf(val), 1);
                }
            }
        }

        console.log('After Section-- firstArray-->', firstArray);
        // for (var i = 0; i < firstArray.length; i++) {
        //     if ($.inArray(firstArray[i], secondArray) !== -1) {
        //         firstArray.splice(firstArray.indexOf[i], 1);
        //     }
        // }

        return firstArray;
    };

    return {
        generateBoardValues: generateBoardValues,
        isValidNumber: isValidNumber,
        solve: solve
    };
})();