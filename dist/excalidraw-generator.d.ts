interface ExcalidrawElement {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    angle: 0;
    strokeColor: string;
    backgroundColor: string;
    fillStyle: string;
    strokeWidth: number;
    strokeStyle: string;
    roughness: number;
    opacity: number;
    text?: string;
    fontSize?: number;
    fontFamily?: number;
    textAlign?: string;
    verticalAlign?: string;
    points?: number[][];
    endBinding?: any;
    startBinding?: any;
}
interface ExcalidrawSchema {
    type: string;
    version: number;
    source: string;
    elements: ExcalidrawElement[];
    appState: {
        gridSize: null;
        viewBackgroundColor: string;
    };
    files: {};
}
export declare class ExcalidrawGenerator {
    private generateId;
    private createBaseElement;
    private createRectangle;
    private createText;
    private createArrow;
    private createDiamond;
    private createEllipse;
    createSchema(description: string, type: string, elements?: any[]): ExcalidrawSchema;
    private generateSimpleFlowchart;
    private generateSimpleArchitecture;
    private generateSimpleDatabase;
    private generateNetworkDiagram;
    private generateWireframe;
    private generateMindMap;
    private generateGenericSchema;
    generateArchitectureDiagram(services: any[], title?: string): ExcalidrawSchema;
    createFlowchart(steps: any[], title?: string): ExcalidrawSchema;
    generateDatabaseSchema(tables: any[], title?: string): ExcalidrawSchema;
    private createSchemaObject;
}
export {};
//# sourceMappingURL=excalidraw-generator.d.ts.map