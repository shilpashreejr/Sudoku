SUDOKU_VIEW = (function () {

	var _setBoardValues = function (selector, boardvalues) {
		var i = 0;

		$(selector).each(function () {

			if (boardvalues[i] !== 0) {
				$(this).val(boardvalues[i]);
				$(this).attr('readonly', 'readonly');
				$(this).css('background', 'yellow');
			} else {
				$(this).val('');
			}

			i++;
		});
	};

	var createBoard = function (boardvalues) {
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
		createBoard: createBoard
	};
})();