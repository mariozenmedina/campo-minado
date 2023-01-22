//Variables
let app = document.getElementById('app');
let boardSize = [8, 8];
let fields = boardSize.reduce((r, c) => r * c);
let map = Array(fields); map.fill(0, 0, fields);
let bombs = 10;

function runBoard() {

    setFields();
    setMap();
    displayData();

    function setFields() {

        app.style.minWidth = 'calc(40px * '+boardSize[1]+')';
        app.style.width = 'calc(40px * '+boardSize[1]+')';

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
                    divs[i].setAttribute('data-class', 'bomba');
                    break;

                default:
                    divs[i].setAttribute('data-class', 'num num' + map[i]);
                    break;
            }

            divs[i].onclick = clickField;
        }

    }

    function clickField(e){
        let dataClass = e.target.getAttribute('data-class').split(' ');
        for(var i=0; i<dataClass.length; i++){
            e.target.classList.add(dataClass[i]);
        }
        if(dataClass.includes('bomba')){
            morreu();
        }
    }

    function morreu(){
        let divs = document.querySelectorAll('#app .field');
        for (var i = 0; i < divs.length; i++) {
            divs[i].onclick = null;
            let dataClass = divs[i].getAttribute('data-class').split(' ');
            for(var j=0; j<dataClass.length; j++){
                divs[i].classList.add(dataClass[j]);
            }
        }
    }

}

runBoard();
