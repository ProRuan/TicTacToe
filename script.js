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
    }
}


// unbekannten Code von ChatGPT erklaeren lassen oder recherchieren!!!