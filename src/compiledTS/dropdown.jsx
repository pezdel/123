"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdowns = void 0;
var react_1 = __importStar(require("react"));
var react_select_1 = __importDefault(require("react-select"));
require("./app.css");
var currency = [
    { value: 'EURUSD', label: 'EURUSD' },
    { value: 'AUDUSD', label: 'AUDUSD' },
    { value: 'GBPUSD', label: 'GBPUSD' },
];
var timeframe = [
    { value: 'h1', label: 'h1' },
    { value: '1d', label: '1d' },
    { value: '1w', label: '1w' },
];
function Dropdowns() {
    var _a = react_1.useState(null), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = react_1.useState(null), tfOption = _b[0], setTFOption = _b[1];
    return (<div className="dropdown-currency">
      <react_select_1.default className="box" defaultValue={selectedOption} onChange={setSelectedOption} options={currency}/>
      <react_select_1.default className="box" defaultValue={tfOption} onChange={setTFOption} options={timeframe}/>
    </div>);
}
exports.Dropdowns = Dropdowns;
