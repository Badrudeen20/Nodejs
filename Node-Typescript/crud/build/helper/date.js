"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
exports.default = formatDate;
