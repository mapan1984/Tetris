function random(min, max) {
    return (min + (Math.random() * (max - min)))
}

// 顺时针旋转矩阵
function rotateRight(matrix) {
    const n = matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            let k = matrix[i][j];
            matrix[i][j] = matrix[y - j][i];
            matrix[y - j][i] = matrix[y - i][y - j];
            matrix[y - i][y - j] = matrix[j][y - i]
            matrix[j][y - i] = k
        }
    }
}

// 逆时针旋转矩阵
function rotateLeft(matrix) {
    const n = matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            let k = matrix[i][j];
            matrix[i][j] = matrix[j][y - i]
            matrix[j][y - i] = matrix[y - i][y - j]
            matrix[y - i][y - j] = matrix[y - j][i]
            matrix[y - j][i] = k
        }
    }
}

function copy(matrix) {
    return matrix.map((row) => row.slice())
}


export {random, rotateRight, rotateLeft, copy}
