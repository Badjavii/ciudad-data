import { AnnotationFactory, AnnotationKind } from "@aspectjs/common";

const AF = new AnnotationFactory("ciudad-data");

export const Singleton = AF.create(AnnotationKind.CLASS, "Singleton");
