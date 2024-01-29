var CSRmatrix = /** @class */ (function () {
    function CSRmatrix(values, colIndex, rowPtr) {
        this.values = values;
        this.colIndex = colIndex;
        this.rowPtr = rowPtr;
    }
    // getting the value at a specific row and column
    CSRmatrix.prototype.get = function (row, col) {
        var rowStart = this.rowPtr[row];
        var rowEnd = this.rowPtr[row + 1];
        for (var i = rowStart; i < rowEnd; ++i) {
            if (this.colIndex[i] === col) {
                return this.values[i];
            }
        }
        return 0;
    };
    //setting the value at a specific row and column
    CSRmatrix.prototype.set = function (row, col) {
        var rowStart = this.rowPtr[row];
        var rowEnd = this.rowPtr[row + 1];
        for (var i = rowStart; i < rowEnd; ++i) {
            if (this.colIndex[i] == col) {
                this.values[i] = 1;
            }
        }
    };
    return CSRmatrix;
}());
// function get list of non zero values
var getNNZ = function (mat) {
    var nnz = [];
    for (var i = 0; i < mat.length; ++i) {
        for (var j = 0; j < mat[i].length; ++j) {
            if (mat[i][j] > 0) {
                nnz.push(mat[i][j]);
            }
        }
    }
    return nnz;
};
var getColIndex = function (mat) {
    var colIndex = [];
    for (var i = 0; i < mat.length; ++i) {
        for (var j = 0; j < mat[i].length; ++j) {
            if (mat[i][j] > 0) {
                colIndex.push(j);
            }
        }
    }
    return colIndex;
};
//function to get rowPointer
var getRowPtr = function (mat) {
    var rowPtr = [0];
    var nnz = 0;
    for (var i = 0; i < mat.length; ++i) {
        for (var j = 0; j < mat[0].length; ++j) {
            if (mat[i][j] > 0) {
                nnz++;
            }
        }
        rowPtr.push(nnz);
    }
    return rowPtr;
};
// function to convert matrix to CSR format
var convertToCSR = function (mat) {
    var values = getNNZ(mat);
    var colIndex = getColIndex(mat);
    var rowPtr = getRowPtr(mat);
    return new CSRmatrix(values, colIndex, rowPtr);
};
// let mat = [[0,0,0,0,0],[1,0,0,0,0],[2,3,0,0,0],[0,0,4,0,0]];
// let csr = convertToCSR(mat);
// console.log(csr.get(0,3));
