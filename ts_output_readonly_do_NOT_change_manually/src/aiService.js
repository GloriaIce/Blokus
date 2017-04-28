var aiService;
(function (aiService) {
    /** Returns the move that the computer player should do for the given state in move. */
    function findComputerMove(move) {
        return createComputerMove(move, 
        // at most 1 second for the AI to choose a move (but might be much quicker)
        { millisecondsLimit: 1000 });
    }
    aiService.findComputerMove = findComputerMove;
    /**
     * Returns all the possible moves for the given state and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     */
    function getPossibleMoves(state, turnIndexBeforeMove) {
        var possibleMoves = [];
        /*
        for (let i = 0; i < gameLogic.ROWS; i++) {
          for (let j = 0; j < gameLogic.COLS; j++) {
            for (let shapeId = 0; shapeId < gameLogic.OPERATIONS; shapeId++) {
              if (!state.shapeStatus[turnIndexBeforeMove][shapeId]) {
                continue;
              }
              try {
                //let nextstep = gameLogic.getNextPossibleShape(state.anchorStatus, state.board, state.shapeStatus, turnIndexBeforeMove);
                possibleMoves.push(gameLogic.createMove(state, i, j, shapeId, turnIndexBeforeMove));
              } catch (e) {
                // The cell in that position was full.
              }
            }
    
          }
        }
        */
        try {
            var nextmoves = gameLogic.getNextPossibleMoveList(state.anchorStatus, state.board, state.shapeStatus, turnIndexBeforeMove);
            if (nextmoves.valid) {
                var anchors = state.anchorStatus;
                for (var _i = 0, _a = nextmoves.moves; _i < _a.length; _i++) {
                    var move = _a[_i];
                    possibleMoves.push(gameLogic.createMove(state, move.row, move.col, move.shapeId, turnIndexBeforeMove));
                }
                var newAnchors = angular.copy(anchors);
                for (var _b = 0, _c = nextmoves.invalidAnchors; _b < _c.length; _b++) {
                    var pos = _c[_b];
                    var pox = gameLogic.parseIJ(pos);
                    newAnchors[pox[0]][pox[1]] = false;
                }
                state.anchorStatus = newAnchors;
            }
        }
        catch (e) {
        }
        return possibleMoves;
    }
    aiService.getPossibleMoves = getPossibleMoves;
    /**
     * Returns the move that the computer player should do for the given state.
     * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
     * and it has either a millisecondsLimit or maxDepth field:
     * millisecondsLimit is a time limit, and maxDepth is a depth limit.
     */
    function createComputerMove(move, alphaBetaLimits) {
        // We use alpha-beta search, where the search states are TicTacToe moves.
        return alphaBetaService.alphaBetaDecision(move, move.turnIndex, getNextStates, getStateScoreForIndex0, null, alphaBetaLimits);
    }
    aiService.createComputerMove = createComputerMove;
    function getStateScoreForIndex0(move, playerIndex) {
        var endMatchScores = move.endMatchScores;
        if (endMatchScores) {
            return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
                : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
                    : 0;
        }
        return 0;
    }
    function getNextStates(move, playerIndex) {
        return getPossibleMoves(move.state, playerIndex);
    }
})(aiService || (aiService = {}));
//# sourceMappingURL=aiService.js.map