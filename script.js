const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn;

const winningCombinations = [
	[0, 1, 2] /* porque são as primeiras combinações e as restantes combinações*/,
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const startGame = () => {
	for (const cellElement of cellElements) {
		cellElement.classList.remove('x');
		cellElement.classList.remove('circle');
		cellElement.removeEventListener('click', handleClick);
		cellElement.addEventListener('click', handleClick, { once: true }); /* serve para clicar numa so celula e nao deixar alterar a celula */
	}

	isCircleTurn = false;

	setBoardHoverClass();

	winningMessage.classList.remove('show-winning-message');
};

const endGame = isDraw => {
	if (isDraw) {
		winningMessageText.innerText = 'Empate!';
	} else {
		winningMessageText.innerText = isCircleTurn ? 'O venceu' : 'X venceu';
	}

	winningMessage.classList.add('show-winning-message');
};

const checkForWin = currentPlayer => {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentPlayer);
		});
	});
};

const checkForDraw = () => {
	return [...cellElements].every(cell => {
		return cell.classList.contains('x') || cell.classList.contains('circle');
	});
};

const placeMark = (cell, classToAdd) => {
	cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
	board.classList.remove('x');
	board.classList.remove('circle');

	if (isCircleTurn) {
		board.classList.add('circle');
	} else {
		board.classList.add('x');
	}
};

const swapTurns = () => {
	isCircleTurn = !isCircleTurn;
	setBoardHoverClass();
};

const handleClick = e => {
	//Clocar a marca X ou Circulo
	const cell = e.target;
	const classToAdd = isCircleTurn ? 'circle' : 'x'; /* para ver qual vamos jogar */

	placeMark(cell, classToAdd);

	//Verificar se ganhou
	const isWin = checkForWin(classToAdd);

	//Verificar se empatou

	const isDraw = checkForDraw();
	if (isWin) {
		endGame(false);
	} else if (isDraw) {
		endGame(true);
	} else {
		//Mudar simbolo
		swapTurns();
	}
};

startGame();

restartButton.addEventListener('click', startGame);
