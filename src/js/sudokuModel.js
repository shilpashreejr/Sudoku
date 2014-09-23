SUDOKU_MODEL = (function () {

	var _currentBoardValues = [],
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

			_updateBoardValues(boardvalues);

			return boardvalues;
		},

		findIndex = function (row, column) {
			sectRow = Math.floor(row / 3),
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
			var isValidType = $.isNumeric(inputVal);
			return isValidType;
		},

		_updateBoardValues = function (boardvalues) {
			var index;

			for (i = 0, row = 0, col = 0; i < 81; i++) {
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

			console.log('row Values ->', _rowValues);
			console.log('col Values ->', _columnValues);
			console.log('sec Values ->', _sectionValues);

			return _currentBoardValues;
		},

		_validationMatrices = function (rowIndex, colIndex) {
			var validation = {
					row: [],
					col: [],
					section: []
				},
				m = 0,
				n = 0;

			for (var i = 0; i < 9; i++) {
				for (var j = 0; j < 9; j++) {
					sectRow = Math.floor(rowIndex / 3),
					sectCol = Math.floor(colIndex / 3);

					if (sectRow == rowIndex && sectCol == colIndex)
						validation.section[i] = _currentBoardValues[i][j];
				}
			}

			return validation;

		},

		_validateAndAddNumber = function (inputVal, rowIndex, colIndex) {
			var sectIndex = (rowIndex % 3) * 3 + (colIndex % 3),
				validation = _validationMatrices(rowIndex, colIndex),
				index = findIndex(rowIndex, colIndex);

			if (
				(!!($.inArray(inputVal, _rowValues[rowIndex]))) &&
				(!!($.inArray(inputVal, _columnValues[colIndex]))) &&
				(!!($.inArray(inputVal, _sectionValues[index])))
			) {
				isValid = true;
				validation.row.splice(colIndex, 1, inputVal);
				validation.col.splice(rowIndex, 1, inputVal);
				_sectionValues[index][_sectionValues[index].length] = inputVal;
			} else {
				isValid = false;

			}

			return isValid;
			//validation.row[rowIndex].push(inputVal);
		},

		isValidNumber = function (inputVal, rowIndex, colIndex) {

			var isValidType = _isValidTypeRange(inputVal);

			_validateAndAddNumber(parseInt(inputVal), rowIndex, colIndex);

			//_addNumber(inputVal, rowIndex, colIndex);

			return isValidType;
		};

	return {
		generateBoardValues: generateBoardValues,
		isValidNumber: isValidNumber
	};
})();