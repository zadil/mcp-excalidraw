export class ExcalidrawGenerator {
    generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
    createBaseElement(type, x, y, width, height) {
        return {
            id: this.generateId(),
            type,
            x,
            y,
            width,
            height,
            angle: 0,
            strokeColor: '#1e1e1e',
            backgroundColor: 'transparent',
            fillStyle: 'solid',
            strokeWidth: 2,
            strokeStyle: 'solid',
            roughness: 1,
            opacity: 100,
        };
    }
    createRectangle(x, y, width, height, text) {
        const element = this.createBaseElement('rectangle', x, y, width, height);
        if (text) {
            element.backgroundColor = '#e3f2fd';
        }
        return element;
    }
    createText(x, y, text, fontSize = 16) {
        const element = this.createBaseElement('text', x, y, 0, 0);
        element.text = text;
        element.fontSize = fontSize;
        element.fontFamily = 1;
        element.textAlign = 'center';
        element.verticalAlign = 'middle';
        return element;
    }
    createArrow(startX, startY, endX, endY) {
        const element = this.createBaseElement('arrow', startX, startY, endX - startX, endY - startY);
        element.points = [[0, 0], [endX - startX, endY - startY]];
        return element;
    }
    createDiamond(x, y, width, height) {
        const element = this.createBaseElement('diamond', x, y, width, height);
        element.backgroundColor = '#fff3e0';
        return element;
    }
    createEllipse(x, y, width, height) {
        const element = this.createBaseElement('ellipse', x, y, width, height);
        element.backgroundColor = '#f3e5f5';
        return element;
    }
    createSchema(description, type, elements) {
        const schemaElements = [];
        // Add title
        schemaElements.push(this.createText(400, 50, description, 24));
        switch (type) {
            case 'flowchart':
                return this.generateSimpleFlowchart(description);
            case 'architecture':
                return this.generateSimpleArchitecture(description);
            case 'database':
                return this.generateSimpleDatabase(description);
            case 'network':
                return this.generateNetworkDiagram(description);
            case 'wireframe':
                return this.generateWireframe(description);
            case 'mind_map':
                return this.generateMindMap(description);
            default:
                return this.generateGenericSchema(description, elements);
        }
    }
    generateSimpleFlowchart(title) {
        const elements = [];
        // Title
        elements.push(this.createText(400, 50, title, 24));
        // Start
        elements.push(this.createEllipse(350, 100, 100, 60));
        elements.push(this.createText(400, 130, 'Start', 14));
        // Process
        elements.push(this.createRectangle(350, 200, 100, 60));
        elements.push(this.createText(400, 230, 'Process', 14));
        // Decision
        elements.push(this.createDiamond(350, 300, 100, 60));
        elements.push(this.createText(400, 330, 'Decision?', 14));
        // End
        elements.push(this.createEllipse(350, 400, 100, 60));
        elements.push(this.createText(400, 430, 'End', 14));
        // Arrows
        elements.push(this.createArrow(400, 160, 400, 200));
        elements.push(this.createArrow(400, 260, 400, 300));
        elements.push(this.createArrow(400, 360, 400, 400));
        return this.createSchemaObject(elements);
    }
    generateSimpleArchitecture(title) {
        const elements = [];
        // Title
        elements.push(this.createText(400, 50, title, 24));
        // Frontend
        elements.push(this.createRectangle(100, 150, 120, 80));
        elements.push(this.createText(160, 190, 'Frontend', 14));
        // API Gateway
        elements.push(this.createRectangle(300, 150, 120, 80));
        elements.push(this.createText(360, 190, 'API Gateway', 14));
        // Service
        elements.push(this.createRectangle(500, 150, 120, 80));
        elements.push(this.createText(560, 190, 'Service', 14));
        // Database
        elements.push(this.createRectangle(500, 300, 120, 80));
        elements.push(this.createText(560, 340, 'Database', 14));
        // Arrows
        elements.push(this.createArrow(220, 190, 300, 190));
        elements.push(this.createArrow(420, 190, 500, 190));
        elements.push(this.createArrow(560, 230, 560, 300));
        return this.createSchemaObject(elements);
    }
    generateSimpleDatabase(title) {
        const elements = [];
        // Title
        elements.push(this.createText(400, 50, title, 24));
        // Users table
        elements.push(this.createRectangle(100, 150, 150, 120));
        elements.push(this.createText(175, 170, 'Users', 16));
        elements.push(this.createText(175, 200, 'id (PK)', 12));
        elements.push(this.createText(175, 220, 'username', 12));
        elements.push(this.createText(175, 240, 'email', 12));
        // Orders table
        elements.push(this.createRectangle(350, 150, 150, 120));
        elements.push(this.createText(425, 170, 'Orders', 16));
        elements.push(this.createText(425, 200, 'id (PK)', 12));
        elements.push(this.createText(425, 220, 'user_id (FK)', 12));
        elements.push(this.createText(425, 240, 'total', 12));
        // Relationship arrow
        elements.push(this.createArrow(250, 210, 350, 210));
        return this.createSchemaObject(elements);
    }
    generateNetworkDiagram(title) {
        const elements = [];
        // Title
        elements.push(this.createText(400, 50, title, 24));
        // Router
        elements.push(this.createDiamond(350, 150, 100, 60));
        elements.push(this.createText(400, 180, 'Router', 14));
        // Devices
        const devices = ['PC 1', 'PC 2', 'Server', 'Printer'];
        const positions = [[200, 250], [600, 250], [400, 300], [400, 100]];
        devices.forEach((device, index) => {
            const [x, y] = positions[index];
            elements.push(this.createRectangle(x - 40, y - 20, 80, 40));
            elements.push(this.createText(x, y, device, 12));
            elements.push(this.createArrow(400, 180, x, y));
        });
        return this.createSchemaObject(elements);
    }
    generateWireframe(title) {
        const elements = [];
        // Title
        elements.push(this.createText(400, 50, title, 24));
        // Header
        elements.push(this.createRectangle(200, 100, 400, 60));
        elements.push(this.createText(400, 130, 'Header / Navigation', 14));
        // Main content
        elements.push(this.createRectangle(200, 180, 280, 200));
        elements.push(this.createText(340, 280, 'Main Content', 14));
        // Sidebar
        elements.push(this.createRectangle(500, 180, 100, 200));
        elements.push(this.createText(550, 280, 'Sidebar', 14));
        // Footer
        elements.push(this.createRectangle(200, 400, 400, 60));
        elements.push(this.createText(400, 430, 'Footer', 14));
        return this.createSchemaObject(elements);
    }
    generateMindMap(title) {
        const elements = [];
        // Central node
        elements.push(this.createEllipse(350, 250, 100, 60));
        elements.push(this.createText(400, 280, title, 14));
        // Branch nodes
        const branches = ['Idea 1', 'Idea 2', 'Idea 3', 'Idea 4'];
        const angles = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
        branches.forEach((branch, index) => {
            const angle = angles[index];
            const x = 400 + Math.cos(angle) * 150;
            const y = 280 + Math.sin(angle) * 150;
            elements.push(this.createEllipse(x - 40, y - 20, 80, 40));
            elements.push(this.createText(x, y, branch, 12));
            elements.push(this.createArrow(400, 280, x, y));
        });
        return this.createSchemaObject(elements);
    }
    generateGenericSchema(title, elements) {
        const schemaElements = [];
        // Title
        schemaElements.push(this.createText(400, 50, title, 24));
        if (elements && elements.length > 0) {
            elements.forEach((element, index) => {
                const x = 200 + (index % 3) * 200;
                const y = 150 + Math.floor(index / 3) * 150;
                schemaElements.push(this.createRectangle(x - 60, y - 30, 120, 60));
                schemaElements.push(this.createText(x, y, element.name || `Element ${index + 1}`, 14));
                // Add connections if specified
                if (element.connections) {
                    element.connections.forEach((connectedIndex) => {
                        if (connectedIndex < elements.length) {
                            const targetX = 200 + (connectedIndex % 3) * 200;
                            const targetY = 150 + Math.floor(connectedIndex / 3) * 150;
                            schemaElements.push(this.createArrow(x, y, targetX, targetY));
                        }
                    });
                }
            });
        }
        else {
            // Default elements
            schemaElements.push(this.createRectangle(300, 150, 120, 60));
            schemaElements.push(this.createText(360, 180, 'Component 1', 14));
            schemaElements.push(this.createRectangle(450, 150, 120, 60));
            schemaElements.push(this.createText(510, 180, 'Component 2', 14));
            schemaElements.push(this.createArrow(420, 180, 450, 180));
        }
        return this.createSchemaObject(schemaElements);
    }
    generateArchitectureDiagram(services, title) {
        const elements = [];
        if (title) {
            elements.push(this.createText(400, 50, title, 24));
        }
        const serviceElements = {};
        // Position services
        services.forEach((service, index) => {
            const x = 150 + (index % 4) * 200;
            const y = 150 + Math.floor(index / 4) * 150;
            serviceElements[service.name] = { x, y };
            // Different shapes for different service types
            switch (service.type) {
                case 'database':
                    elements.push(this.createEllipse(x - 60, y - 30, 120, 60));
                    break;
                case 'queue':
                    elements.push(this.createDiamond(x - 60, y - 30, 120, 60));
                    break;
                case 'cache':
                    elements.push(this.createEllipse(x - 60, y - 30, 120, 60));
                    break;
                default:
                    elements.push(this.createRectangle(x - 60, y - 30, 120, 60));
            }
            elements.push(this.createText(x, y - 10, service.name, 14));
            elements.push(this.createText(x, y + 10, service.type, 10));
        });
        // Add connections
        services.forEach((service) => {
            if (service.connections) {
                const fromPos = serviceElements[service.name];
                service.connections.forEach((targetName) => {
                    const toPos = serviceElements[targetName];
                    if (toPos) {
                        elements.push(this.createArrow(fromPos.x, fromPos.y, toPos.x, toPos.y));
                    }
                });
            }
        });
        return this.createSchemaObject(elements);
    }
    createFlowchart(steps, title) {
        const elements = [];
        if (title) {
            elements.push(this.createText(400, 50, title, 24));
        }
        const stepElements = {};
        // Position steps
        steps.forEach((step, index) => {
            const x = 400;
            const y = 150 + index * 120;
            stepElements[step.id] = { x, y };
            // Different shapes for different step types
            switch (step.type) {
                case 'start':
                case 'end':
                    elements.push(this.createEllipse(x - 60, y - 30, 120, 60));
                    break;
                case 'decision':
                    elements.push(this.createDiamond(x - 60, y - 30, 120, 60));
                    break;
                default:
                    elements.push(this.createRectangle(x - 60, y - 30, 120, 60));
            }
            elements.push(this.createText(x, y, step.text, 14));
        });
        // Add connections
        steps.forEach((step) => {
            if (step.next) {
                const fromPos = stepElements[step.id];
                step.next.forEach((nextId) => {
                    const toPos = stepElements[nextId];
                    if (toPos) {
                        elements.push(this.createArrow(fromPos.x, fromPos.y + 30, toPos.x, toPos.y - 30));
                    }
                });
            }
        });
        return this.createSchemaObject(elements);
    }
    generateDatabaseSchema(tables, title) {
        const elements = [];
        if (title) {
            elements.push(this.createText(400, 50, title, 24));
        }
        const tableElements = {};
        // Position tables
        tables.forEach((table, index) => {
            const x = 150 + (index % 3) * 250;
            const y = 150 + Math.floor(index / 3) * 200;
            const height = 60 + table.columns.length * 20;
            tableElements[table.name] = { x, y };
            // Table rectangle
            elements.push(this.createRectangle(x - 75, y - 30, 150, height));
            // Table name
            elements.push(this.createText(x, y - 10, table.name, 16));
            // Columns
            table.columns.forEach((column, colIndex) => {
                const columnY = y + 20 + colIndex * 20;
                let columnText = `${column.name}: ${column.type}`;
                if (column.primaryKey)
                    columnText += ' (PK)';
                if (column.foreignKey)
                    columnText += ' (FK)';
                elements.push(this.createText(x, columnY, columnText, 10));
            });
        });
        // Add foreign key relationships
        tables.forEach((table) => {
            table.columns.forEach((column) => {
                if (column.foreignKey) {
                    const fromPos = tableElements[table.name];
                    const toPos = tableElements[column.foreignKey.split('.')[0]];
                    if (toPos) {
                        elements.push(this.createArrow(fromPos.x + 75, fromPos.y, toPos.x - 75, toPos.y));
                    }
                }
            });
        });
        return this.createSchemaObject(elements);
    }
    createSchemaObject(elements) {
        return {
            type: 'excalidraw',
            version: 2,
            source: 'https://excalidraw.com',
            elements,
            appState: {
                gridSize: null,
                viewBackgroundColor: '#ffffff'
            },
            files: {}
        };
    }
}
//# sourceMappingURL=excalidraw-generator.js.map