SUDOKU_VIEW = (function () {

	var NUM_OF_COLS = 9,
		NUM_OF_ROWS = 9,

		/**
		 * The generated board values are set to the respective td.
		 *
		 * @param {String} selector DOM selector
		 * @param {Array} boardvalues The generated board values
		 */
		_setBoardValues = function (selector, boardvalues) {
			var i = 0;

			$(selector).each(function () {
				if (boardvalues[i] !== 0) {
					$(this).val(boardvalues[i]);
					$(this).attr('readonly', 'readonly');
					$(this).addClass('disabledState');
				} else {
					$(this).val('');
				}

				i++;
			});
		},

		/**
		 * With few combinations of the user input values, the board cannot
		 * be solved.
		 * This user input validates with the rules but for the board to be
		 * resolved, it has to be in a particular place.
		 *
		 */
		showErrorMsg = function () {
			alert("With some of the values you have entered, the board cannot be solved. Please clear them and try again.");
		},

		/**
		 * Displays the red error background for the td for error state.
		 *
		 * @param {String} $this DOM selector
		 */
		showError = function ($this) {
			$this.addClass('errorState');
		},

		/**
		 * Removes the red background for the td when there is no error.
		 *
		 * @param {String} $this DOM selector
		 *
		 */
		removeErrorState = function ($this) {
			$this.removeClass('errorState');
		},

		/**
		 * The solved board values are set to the respective td.
		 *
		 * @param {String} selector DOM selector
		 * @param {Array} boardvalues The generated board values
		 */
		solvedBoard = function (selector, boardvalues) {
			var row = 0
			col = 0;
			$(selector).each(function () {
				if (boardvalues[row][col] !== 0) {
					$(this).val(boardvalues[row][col]);
				}
				col++;
				if (col === NUM_OF_COLS) {
					col = 0;
					row++;
					if (row === NUM_OF_ROWS) {
						return true;
					}
				}
			});
		},

		/**
		 * The sudoku table is dynamically generated here
		 *
		 * @param {Array} boardvalues The generated board values
		 */
		createBoard = function (boardvalues) {
			var table = '<table id="sudokuTable"><tbody>',
				row = 0,
				col = 0,
				td = '',
				tr = [];

			for (col = 0; col < NUM_OF_COLS; col++) {
				td = td + '<td><input maxlength="1"></input></td>';
			}

			for (row = 0; row < NUM_OF_ROWS; row++) {
				table = table + '<tr>' + td + '</tr>'
			}
			table = table + '</tbody></table>';
			$('#sudokuContainer').append(table);

			_setBoardValues('#sudokuTable input', boardvalues);

			return table;
		};

	return {
		createBoard: createBoard,
		solvedBoard: solvedBoard,
		showError: showError,
		removeErrorState: removeErrorState,
		showErrorMsg: showErrorMsg
	};
})();