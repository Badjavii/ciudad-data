"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResCatcher = exports.Singleton = void 0;
const common_1 = require("@aspectjs/common");
const AF = new common_1.AnnotationFactory("ciudad-data");
exports.Singleton = AF.create(common_1.AnnotationKind.CLASS, "Singleton", function Singleton() { });
exports.ErrorResCatcher = AF.create(common_1.AnnotationKind.METHOD, "ErrorResCatcher", function ErrorResCatcher() { });
