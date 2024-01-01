let currentPlayer = 'circle';

let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];


function init() {
    render();
}


function render() {
    const content = document.getElementById('content');

    let table = '<table>';
    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldId = i * 3 + j;
            let symbol = '';
            if (fields[fieldId] === 'circle') {
                symbol = generateCircle();
            } else if (fields[fieldId] === 'cross') {
                symbol = generateCross();
            }
            table += `<td onclick="addSymbol(this, ${fieldId})">${symbol}</td>`;
        }
        table += '</tr>';
    }
    table += `</table>`;

    content.innerHTML = table;
}


// eventuell HTML code auslagern und einfach Variablen einfuegen


function generateCircle() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;

    const code = `
        <svg width="${width}" height="${height}">
            <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}"
                stroke="${color}" stroke-width="5" fill="none"/>
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="125ms" fill="freeze" />
            </circle>
        </svg>
    `;

    return code;
}


function generateCross() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;

    const code = `
        <svg width="${width}" height="${height}">
            <line x1="0" y1="0" x2="${width}" y2="${height}"
                stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0; ${width}" dur="125ms" />
                <animate attributeName="y2" values="0; ${height}" dur="125ms" />
            </line>
            <line x1="${width}" y1="0" x2="0" y2="${height}"
                stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="${width}; 0" dur="125ms" />
                <animate attributeName="y2" values="0; ${height}" dur="125ms" />
            </line>
        </svg>
    `;

    return code;
}


function addSymbol(cell, fieldId) {
    if (fields[fieldId] === null) {
        fields[fieldId] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircle() : generateCross();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}


function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


function getWinningCombination() {
    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return winCombinations[i];
        }
    }
    return null;
}


function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    debugger;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

// unbekannten Code von ChatGPT erklaeren lassen oder recherchieren!!!