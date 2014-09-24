SUDOKU_MODEL = (function () {

    var _currentBoardValues = [],
        _originalBoardValues = [],
        _sectionValues = [],
        _columnValues = [],
        _rowValues = [];

    /**
     * Generates the board values and also updates the
     * row , column and section values.
     *
     * @returns {Array} boardValues A single dimensional array
     */
    var generateBoardValues = function () {
            var boardvalues = [
                    0, 9, 8, 0, 0, 2, 3, 0, 0,
                    0, 4, 7, 0, 3, 5, 0, 8, 0,
                    0, 0, 0, 0, 0, 7, 5, 0, 2,
                    0, 6, 5, 0, 8, 0, 0, 7, 3,
                    0, 0, 0, 5, 7, 1, 0, 9, 0,
                    4, 0, 9, 0, 0, 0, 8, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0,
                    8, 1, 0, 0, 2, 9, 4, 0, 5,
                    9, 5, 0, 3, 1, 0, 7, 2, 0
                ];

            _getCurrentBoard(boardvalues);
            _originalBoardValues = $.extend(true, {}, _currentBoardValues);

            return boardvalues;
        },

        /**
         * There are 9 sections in a board,
         * this function finds the section index
         *
         * @param {Number} row Row id
         * @param {Number} col Column id
         * @returns {Number} An index of the section
         */
        _findIndex = function (row, column) {
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

        /**
         * Validates the user's inputs for the type and the range.
         * The range allowed is only from 1 to 9 and type is number.
         *
         * @param {Number} inputVal The user's input
         * @returns {Boolean} isValidType True/False Decision based on the checks.
         */
        _isValidTypeRange = function (inputVal) {
            var isType = $.isNumeric(inputVal);
            if ((inputVal > 0 && inputVal <= 9) && isType) {
                isValidType = true;
                return isValidType;
            }
        },

        /**
         * The current board values is being obtained here.
         *
         * @param {Number} boardvalues The single dimension array
         * @returns {Array} _currentBoardValues Current board values
         */
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

        /**
         * The current board values are updated every time
         * there is a new entry or when the board is solved.
         *
         * @param {Array} _currentBoardValues Current board values
         * @returns {Array} _currentBoardValues Updated Current board values
         */
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
                    index = _findIndex(i, j);
                    if (_sectionValues[index] == undefined) {
                        _sectionValues[index] = [];
                    }
                    _sectionValues[index][_sectionValues[index].length] = _currentBoardValues[i][j];
                }
            }

            return _currentBoardValues;
        },

        /**
         * Validates(If the user input doesnt exist either row, column, or section.)
         * and adds the values to the _currentBoardValues,
         * _rowValues, _columnvalues, _sectionValues
         *
         * @param {Number} inputVal The user input
         * @param {Number} rowIndex Row id
         * @ param{Number} colIndex Col id
         * @returns {Boolean} isValid If the values gets added, then returns True, if not False.
         */
        _validateAndAddNumber = function (inputVal, rowIndex, colIndex) {
            var index = _findIndex(rowIndex, colIndex);

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

        /**
         * Validates the user's inputs for the type and the range.
         * The range allowed is only from 1 to 9 and type is number.
         * Also updates the current, row, column and section values
         *
         * @param {Number} inputVal The user input
         * @param {Number} rowIndex Row id
         * @ param{Number} colIndex Col id
         * @returns {Boolean} isValidType True/False Decision based on the checks.
         */
        isValidNumber = function (inputVal, rowIndex, colIndex) {
            return _isValidTypeRange(inputVal);
        },

        isValueAdded = function (inputVal, rowIndex, colIndex) {
            return _validateAndAddNumber(parseInt(inputVal), rowIndex, colIndex);
        },
        /**
         * Solves the Game
         */
        solve = function () {

            if (_solveInternal()) {
                return _currentBoardValues;
            } else {
                return false;
            }

        },

        /**
         * Solves the Game
         * PSUEDO CODE FOR THE SOLVER
         *  solve(game):
         *     if (game board is full)
         *        return SUCCESS
         *   else
         *      next_square = getNextEmptySquare()
         *         for each value that can legally be put in next_square
         *            put value in next_square (i.e. modify game state)
         *           if (solve(game)) return SUCCESS
         *          remove value from next_square (i.e. backtrack to a previous state)
         * return FAILURE
         *
         */
        _solveInternal = function () {

            if (_isGameComplete())
                return true;

            //find Empty square
            var emptyRow = -1,
                emptyCol = -1;
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (_currentBoardValues[i][j] == 0) {
                        emptyRow = i;
                        emptyCol = j;
                        break;
                    }
                }
                if (emptyRow != -1) {
                    break;
                }
            }

            if (emptyRow == -1) {
                console.log("Something wrong");
            }

            //try each available number
            var availNums = _getAvailableNumbers(emptyRow, emptyCol);
            if (availNums.length === 0) {
                return false;
            }
            //Randomize availNums
            var randomAvailNums = [];
            var availNumLen = availNums.length;
            for (var i = 0; i < availNumLen; i++) {
                var val = availNums[Math.floor(Math.random() * availNums.length)];
                randomAvailNums[i] = val;
                availNums.splice(availNums.indexOf(val), 1);
            }
            availNums = randomAvailNums;

            for (var i = 0; i < availNums.length; i++) {
                var curVal = availNums[i];
                var isValid = _validateAndAddNumber(curVal, emptyRow, emptyCol);
                if (!isValid) {
                    console.log("TRY AGAIN");
                }

                console.log('_currentBoardValues-->', _currentBoardValues);

                if (_solveInternal()) {
                    return true;
                }

                _currentBoardValues[emptyRow][emptyCol] = 0;
                _rowValues[emptyRow].splice(_rowValues[emptyRow].indexOf(curVal), 1);
                _columnValues[emptyCol].splice(_columnValues[emptyCol].indexOf(curVal), 1);
                var index = _findIndex(emptyRow, emptyCol);
                _sectionValues[index].splice(_sectionValues[index].indexOf(curVal), 1);

            }

            return false;
        },

        /**
         * Gets the numbers available for a for a particular index.
         *
         * @param {Number} rowIndex Row id
         * @param {Number} colIndex Col id
         * @returns {Array} availableNums Single dimensional array
         */
        _getAvailableNumbers = function (row, col) {
            var availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var index = _findIndex(row, col);
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
        },
        /**
         * The current board values are updated every time
         * there is a new entry or when the board is solved.
         *
         * @param {Number} inputVal The user input
         * @param {Number} rowIndex Row id
         * @ param{Number} colIndex Col id
         * @returns {Boolean} isValidType True/False Decision based on the checks.
         */
        removeExistingElements = function (firstArray, row, col, index) {

            if (_rowValues[row] === undefined) {
                _rowValues[row] = [];
            }
            for (var i = 0; i < _rowValues[row].length; i++) {
                val = Number(_rowValues[row][i]);
                if (val > 0) {
                    // Remove from array
                    if (firstArray.indexOf(val) > -1) {
                        firstArray.splice(firstArray.indexOf(val), 1);
                    }
                }
            }

            if (_columnValues[col] === undefined) {
                _columnValues[col] = [];
            }
            for (var i = 0; i < _columnValues[col].length; i++) {
                val = Number(_columnValues[col][i]);
                if (val > 0) {
                    // Remove from array
                    if (firstArray.indexOf(val) > -1) {
                        firstArray.splice(firstArray.indexOf(val), 1);
                    }
                }
            }

            if (_sectionValues[index] === undefined) {
                _sectionValues[index] = [];
            }
            for (var i = 0; i < _sectionValues[index].length; i++) {
                val = Number(_sectionValues[index][i]);
                if (val > 0) {
                    // Remove from array
                    if (firstArray.indexOf(val) > -1) {
                        firstArray.splice(firstArray.indexOf(val), 1);
                    }
                }
            }

            return firstArray;
        },
        resetBoardValues = function () {
            _currentBoardValues = _originalBoardValues;
            _updateBoardValues(_originalBoardValues);
            return _originalBoardValues;
        };

    return {
        generateBoardValues: generateBoardValues,
        isValidNumber: isValidNumber,
        solve: solve,
        isValueAdded: isValueAdded,
        resetBoardValues: resetBoardValues
    };
})();