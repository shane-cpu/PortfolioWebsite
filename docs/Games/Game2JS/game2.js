var playerTurn = true;

const Board = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
];

const Piece = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,3,0,3,0,3,0,3],
    [3,0,3,0,3,0,3,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
];

const CreateBoard = () => {

    var rows = Board;
    var InDiv = document.getElementById("inner-Board");

    for(var y = 0; y < Board.length; y++) {
        for (var x = 0; x < Board[y].length; x++) {
            const val = rows[y][x]; // 0 or 1

            const d = document.createElement("div");

            let className = "Tile";

            if (val == 0) className += "white";
            if (val == 1) className += "black";

            d.setAttribute("class", className);

            d.style.left = 100 *(x/8) + "%";
            d.style.top = 100 * (y/8) + "%";

            InDiv.append(d);
        }
    }
};

const CreateButtons = () => {

    var rows = Board;
    var InDiv = document.getElementById("inner-Board");
    var idT = 0;

    for(var y = 0; y < Board.length; y++) {
        for (var x = 0; x < Board[y].length; x++) {
            const val = rows[y][x]; // 0 or 1

            const d = document.createElement("div");

            let className = "Button";

            if (val == 0) className += "white";
            if (val == 1) className += "black";

            const gridPos = {y: y, x: x};

            if (className == 'Buttonblack') {

                d.addEventListener('click', () => {
                    SelectPiece(gridPos.y, gridPos.x);
                });
            }

            d.setAttribute("class", className);

            d.style.left = 100 *(x/8) + "%";
            d.style.top = 100 * (y/8) + "%";

            InDiv.append(d);
        }
    }
};

const CreatePieces = () => {

    var rows = Piece;
    var InDiv = document.getElementById("inner-Board");
    var PNumber = 0;

    for(var y = 0; y < Piece.length; y++) {
        for (var x = 0; x < Piece[y].length; x++) {
            const val = rows[y][x]; // 0 or 1

            let className = "Piece";
            let idName = "P";

            if (PNumber == 12) {
                PNumber = 0;
            }

            if (val == 1) {
                className += "White";
                idName += "W" + PNumber;
                PNumber++;
                const d = document.createElement("div");

                d.setAttribute("class", className);
                d.setAttribute("id", idName);

                d.style.left = 100 *(x/8) + "%";
                d.style.top = 100 * (y/8) + "%";

                InDiv.append(d);
            }
            if (val == 2) {
                className += "Red";
                idName += "R" + PNumber;
                PNumber++;
                const d = document.createElement("div");

                d.setAttribute("class", className);
                d.setAttribute("id", idName);

                d.style.left = 100 *(x/8) + "%";
                d.style.top = 100 * (y/8) + "%";

                InDiv.append(d);
            }
        }
    }
};

const SelectPiece = (y, x) => {
    for (let i = 0; i < 12; i++) {
        const d = document.getElementById("PW" + i);
        let p = parseFloat(d.style.left);
        let b = parseFloat(d.style.top);
        p *= 8;
        b *= 8;
        p /= 100;
        b /= 100;
        if (p == x && b == y) SelectedPiece(d, p, b);
    }
    for (let i = 0; i < 12; i++) {
        const d = document.getElementById("PR" + i);
        let p = parseFloat(d.style.left);
        let b = parseFloat(d.style.top);
        p *= 8;
        b *= 8;
        p /= 100;
        b /= 100;
        if (p == x && b == y) SelectedPiece(d, p, b);
    }
}

const SelectedPiece = (d, p, b) => {
    const divClass = d.getAttribute('class');
    const rows = Piece;
    if (divClass == 'PieceWhite' && playerTurn == true) {
        let M = 0;
        let N = 0;
        let O = 0;
        let P = 0;
        if (b + 1 < 8 && p + 1 < 8) M = rows[b+1][p+1];
        if (b + 1 < 8 && p - 1 > -1) N = rows[b+1][p-1];
        if (b + 2 < 8 && p + 2 < 8) O = rows[b+2][p+2];
        if (b + 2 < 8 && p - 2 > -1) P = rows[b+2][p-2];

        if (M == 3 || N == 3) {
            let t = document.getElementsByClassName('Buttonblack');
            for (let i = 0; i < t.length; i++) {
                let y = parseFloat(t[i].style.top);
                let x = parseFloat(t[i].style.left);
                x *= 8;
                y *= 8;
                x /= 100;
                y /= 100;
                if(((b+1) == y && (p+1) == x) && M == 3) {
                    PickaPlace(d, y, x, 1, b, p);
                }
                if(((b+1) == y && (p-1) == x) && N == 3) {
                    PickaPlace(d, y, x, 2, b, p);
                }
            }

        }

        if (M == 2 || N == 2) {
            let t = document.getElementsByClassName('Buttonblack');
            for (let i = 0; i < t.length; i++) {
                let y = parseFloat(t[i].style.top);
                let x = parseFloat(t[i].style.left);
                x *= 8;
                y *= 8;
                x /= 100;
                y /= 100;
                if(((b+1) == y && (p+1) == x) && M == 2) {
                    if (O == 3) {
                        JumpaPlace(d, (y + 1), (x + 1), 1, b, p, x, y, 'Red');
                    }
                }
                if(((b+1) == y && (p-1) == x) && N == 2) {
                    if (P == 3) {
                        JumpaPlace(d, (y + 1), (x - 1), 2, b, p, x, y, 'Red');
                    }
                }
            }
        }
    }
    if (divClass == 'PieceRed' && playerTurn == false) {
        let M = 0;
        let N = 0;
        let O = 0;
        let P = 0;
        if (b - 1 > -1 && p + 1 < 8) M = rows[b-1][p+1];
        if (b - 1 > -1 && p - 1 > -1) N = rows[b-1][p-1];
        if (b - 2 > -1 && p + 2 < 8) O = rows[b-2][p+2];
        if (b - 2 > -1 && p - 2 > -1) P = rows[b-2][p-2];

        if (M == 3 || N == 3) {
            let t = document.getElementsByClassName('Buttonblack');
            for (let i = 0; i < t.length; i++) {
                let y = parseFloat(t[i].style.top);
                let x = parseFloat(t[i].style.left)
                x *= 8;
                y *= 8;
                x /= 100;
                y /= 100;
                if(((b-1) == y && (p+1) == x) && M == 3) {
                    PickaPlace(d, y, x, 1, b, p);
                }
                if(((b-1) == y && (p-1) == x) && N == 3) {
                    PickaPlace(d, y, x, 2, b, p);
                }
            }
        }
        
        if (M == 1 || N == 1) {
            let t = document.getElementsByClassName('Buttonblack');
            for (let i = 0; i < t.length; i++) {
                let y = parseFloat(t[i].style.top);
                let x = parseFloat(t[i].style.left);
                x *= 8;
                y *= 8;
                x /= 100;
                y /= 100;
                if(((b-1) == y && (p+1) == x) && M == 1) {
                    if (O == 3) {
                        JumpaPlace(d, (y - 1), (x + 1), 1, b, p, x, y, 'White');
                    }
                }
                if(((b-1) == y && (p-1) == x) && N == 1) {
                    if (P == 3) {
                        JumpaPlace(d, (y - 1), (x - 1), 2, b, p, x, y, 'White');
                    }
                }
            }
        }
    }
}

const PickaPlace = (d, y, x, i2, b, p) => {
    const Id = document.getElementById('inner-Board')
    const d2 = document.createElement('div');

    d2.style.left = 100 * (x/8) + '%';
    d2.style.top = 100 * (y/8) + '%';

    removeElement('l' + i2);
    d2.setAttribute('id', 'l' + i2);

    d2.addEventListener('click', function MovePiece1() {
        d.style.left = 100 *(x/8) + "%";
        d.style.top = 100 * (y/8) + "%";
        let type = d.getAttribute('class');
        if (type == 'PieceWhite') {
            Piece[y][x] = 1;
            playerTurn = false;
        }
        if (type == 'PieceRed') {
            Piece[y][x] = 2;
            playerTurn = true;
        }
        Piece[b][p] = 3;
        removeElement('l' + 1);
        removeElement('l' + 2);
    }, true);

    Id.append(d2);
}

const JumpaPlace = (d, y, x, i2, b, p, x1, y1, N) => {
    const Id = document.getElementById('inner-Board')
    const d2 = document.createElement('div');

    d2.style.left = 100 * (x/8) + '%';
    d2.style.top = 100 * (y/8) + '%';

    removeElement('l' + i2);
    d2.setAttribute('id', 'l' + i2);

    d2.addEventListener('click', function MovePiece1() {
        d.style.left = 100 *(x/8) + "%";
        d.style.top = 100 * (y/8) + "%";
        let type = d.getAttribute('class');
        if (type == 'PieceWhite') {
            Piece[y][x] = 1;
            Piece[y1][x1] = 3;
            playerTurn = false;
        }
        if (type == 'PieceRed') {
            Piece[y][x] = 2;
            Piece[y1][x1] = 3;
            playerTurn = true;
        }
        Piece[b][p] = 3;
        removeElement('l' + 1);
        removeElement('l' + 2);
        TakeaPiece(y1, x1, N);
    }, true);

    Id.append(d2);
}

function removeElement(id) {
    var element = document.getElementById(id);
    if (element == null) return;
    element.parentNode.removeChild(element);
}

function TakeaPiece(y, x, T) {
    const t = document.getElementsByClassName('Piece' + T);

    for (let i = 0; i < t.length; i++) {
        let y1 = parseFloat(t[i].style.top);
        let x1 = parseFloat(t[i].style.left)
        x1 *= 8;
        y1 *= 8;
        x1 /= 100;
        y1 /= 100;
        if((y1 == y && x1 == x)) {
            t[i].style.left = 100 * 1/8 + "%";
            t[i].style.top = 100 * 9/8 + "%";
        }
    }
}

const CheckIfWin = () => {
    var isWin1 = false;
    var isWin2 = false;

    var Piece1 = 0;
    var Piece2 = 0;

    var rows = Piece;

    for (var y = 0; y < Piece.length; y++) {
        for (var x = 0; x < Piece[y].length; x++) {
            var val = rows[y][x];

            if (val == 1) {
                Piece1++;
            }
            if (val == 2) {
                Piece2++;
            }
        }
    }
    if (Piece2 == 0 && Piece1 > 0) {
        isWin1 = true;
    }
    if (Piece1 == 0 && Piece2 > 0) {
        isWin2 = true;
    }
}

CreateBoard();
CreatePieces();
CreateButtons();