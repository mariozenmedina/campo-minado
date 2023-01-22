//Variables
let app = document.getElementById('app');
let boardSize = [8, 8];
let fields = boardSize.reduce((r, c) => r * c);
let map = Array(fields); map.fill(0, 0, fields);
let bombs = 60;

function runBoard() {

    setFields();
    setMap();
    displayData();

    function setFields() {
        for (var i = 0; i < fields; i++) {
            let div = document.createElement('div');
            div.classList.add('field');
            div.setAttribute('data-num', i);
            app.append(div);
        }
    }

    function setMap() {
        for (var i = 0; i < bombs; i++) {
            let num = Math.floor(Math.random() * 64);
            while (map[num]) {
                num = Math.floor(Math.random() * 64);
            }
            map[num] = 'b';
        }

        for (var j = 0; j < map.length; j++) {
            if (map[j] === 'b') {
                setNumbers(j);
            }
        }

        function setNumbers(i) {
            let columns = boardSize[1];

            let adjacentes = [i-columns, i+columns];

            if( i % columns != 0){ //SE O ELEMENTO NÃO ESTÁ NA COLUNA DA ESQUERDA
                adjacentes.push(i-1);
                adjacentes.push(i-columns-1);
                adjacentes.push(i+columns-1);
            }
            if( ( i+1 ) % columns != 0){ //SE O ELEMENTO NÃO ESTÁ NA COLUNA DA DIREITA
                console.log(i);
                adjacentes.push(i+1);
                adjacentes.push(i-columns+1);
                adjacentes.push(i+columns+1);
            }

            for(var j=0; j<adjacentes.length; j++){
                if (map[adjacentes[j]] != undefined && map[adjacentes[j]] != 'b') {
                    map[adjacentes[j]]++;
                }
            }

        }


    }

    function displayData() {
        let divs = document.querySelectorAll('#app .field');

        for (var i = 0; i < map.length; i++) {
            switch (map[i]) {
                case 'b':
                    divs[i].classList.add('bomba');
                    break;

                default:
                    divs[i].classList.add('num', 'num' + map[i]);
                    break;
            }
        }

    }


}

runBoard();
