let fields = [
    null,
    'circle',
    'cross',
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
                symbol = 'o';
            } else if (fields[fieldId] === 'cross') {
                symbol = 'x';
            }
            table += `<td>${symbol}</td>`;
        }
        table += '</tr>';
    }
    table += `</table>`;

    content.innerHTML = table;
}


// eventuell HTML code auslagern und einfach Variablen einfuegen