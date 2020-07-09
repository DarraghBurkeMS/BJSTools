define(function (require, exports, module) {
    'use strict';
    
    function ToolType(message) {
        this.message = message;
    }
    
    ToolType.prototype.toString = function () {
        return this.message;
    };
    
    exports.ToolType = ToolType;
    exports.ToolName = 'Paintbrush';
});
