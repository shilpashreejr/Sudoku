SUDOKU = (function () {

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

		return boardvalues;

		/*$('td').each(function () {
			boardvalues[i] = boardvalues[i] !== 0 ? boardvalues[i] : '';
			$(this).html(boardvalues[i]);
			i++;
		});*/

	};

	var createBoard = function () {
		//alert('createBoard');
		var table = '<table id="sudoku"><tbody>',
			row = 0,
			col = 0,
			td = '',
			tr = [];

		for (col = 0; col < 9; col++) {
			td = td + '<td></td>';
		}

		for (row = 0; row < 9; row++) {
			table = table + '<tr>' + td + '</tr>'
		}
		table = table + '</tbody></table>';
		$('#sudokuContainer').append(table);
		setBoardValues(table);

		return table;
	};

	return {
		generateBoardValues: generateBoardValues
	};
})();