/******************************************************************************
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 blackchip.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/

/**
 * @module score.models
 */
var score = score || {};
score.models = score.models || {};

/**
 * Passes a token around in a given order.
 * 
 * This can be used when there is a regular rotation for a token. For
 * example, the dealer in a card game, the server in ping pong, etc. 
 * 
 * Use as in the following:
 * 
 *      var players = score.models.Players([
 *          { name: "Player 1"},
 *          { name: "Player 2"},
 *          { name: "Player 3"}
 *          { name: "Player 4"},
 *      ]);
 *      var token = score.models.Token();
 *      var tokenRing = score.models.TokenRing(players, token);
 * 
 * Lets say this is a card game of hearts. Set player two to be the first
 * dealer (remember that players are zero based):
 * 
 *      token(players(1));
 * 
 * To advance the dealer:
 * 
 *      tokenRing.next();
 * 
 * To undo:
 * 
 *      tokenRing.previous();
 * 
 * Events are triggered in score.models.Token.
 * 
 * @class TokenRing
 * @constructor
 * 
 * @param {score.model.Player Array} players List of players in the order
 * that the token should be passed around.
 * 
 * @param {score.model.Token} token The token to assign to the player.
 */
score.models.TokenRing = score.models.TokenRing || function(players, token) {

    var self = {};
    
    /**
     * Advance the token to the next player. 
     * 
     * If the token has not been assigned to any player, the first player will 
     * be selected.
     * 
     * @method next
     */
    self.next = function() {
        var holder = token() ? token().id() : players.length - 1;
        var nextHolder = ( holder !== players.length - 1 ) ? holder + 1 : 0;
        token(players[nextHolder]);    
    };
    
    /**
     * Rollback the token to the previous player.
     * 
     * If the token has not been assigned to any player, the last player will
     * be selected.
     * 
     * @method previous
     */
    self.previous = function() {
        var holder = token() ? token().id() : 0; 
        var nextHolder = ( holder !== 0 ) ? holder - 1 : players.length - 1;
        token(players[nextHolder]);     
    };
    
    return self; 
};