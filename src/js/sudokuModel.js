SUDOKU_MODEL = (function () {

	var _currentBoardValues = [];

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
			],
				i, col, row;

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

			console.log('_currentBoardValues:', _currentBoardValues);

			return boardvalues;
		},

		_isValidTypeRange = function (inputVal) {
			var isValidType = $.isNumeric(inputVal);
			return isValidType;
		},

		isValidNumber = function (inputVal) {
			return _isValidTypeRange(inputVal);
		}

	return {
		generateBoardValues: generateBoardValues,
		isValidNumber: isValidNumber
	};
})();