SUDOKU_VIEW = (function () {

	var _setBoardValues = function (selector, boardvalues) {
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

		showError = function ($this) {
			$this.addClass('errorState');
		},
		removeErrorState = function ($this) {
			$this.removeClass('errorState');
		},
		solvedBoard = function (selector, boardvalues) {
			var row = 0
			col = 0;
			$(selector).each(function () {
				if (boardvalues[row][col] !== 0) {
					$(this).val(boardvalues[row][col]);
				}
				col++;
				if (col === 9) {
					col = 0;
					row++;
					if (row === 9) {
						return true;
					}
				}
			});
		},

		createBoard = function (boardvalues) {
			//alert('createBoard');
			var table = '<table id="sudokuTable"><tbody>',
				row = 0,
				col = 0,
				td = '',
				tr = [];

			for (col = 0; col < 9; col++) {
				td = td + '<td><input maxlength="1"></input></td>';
			}

			for (row = 0; row < 9; row++) {
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
		removeErrorState: removeErrorState
	};
})();