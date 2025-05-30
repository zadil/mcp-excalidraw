#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ExcalidrawGenerator } from './excalidraw-generator.js';

class ExcalidrawMCPServer {
  private server: Server;
  private generator: ExcalidrawGenerator;

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-excalidraw',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.generator = new ExcalidrawGenerator();
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_schema',
            description: 'Create an Excalidraw schema/diagram from a description',
            inputSchema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Description of the schema to create',
                },
                type: {
                  type: 'string',
                  enum: ['flowchart', 'architecture', 'database', 'network', 'wireframe', 'mind_map'],
                  description: 'Type of schema to generate',
                },
                elements: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      type: { type: 'string' },
                      connections: {
                        type: 'array',
                        items: { type: 'string' }
                      }
                    }
                  },
                  description: 'Optional specific elements to include'
                }
              },
              required: ['description', 'type'],
            },
          },
          {
            name: 'generate_architecture_diagram',
            description: 'Generate a system architecture diagram',
            inputSchema: {
              type: 'object',
              properties: {
                services: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      type: { 
                        type: 'string',
                        enum: ['database', 'api', 'frontend', 'service', 'queue', 'cache']
                      },
                      connections: {
                        type: 'array',
                        items: { type: 'string' }
                      }
                    }
                  }
                },
                title: { type: 'string' }
              },
              required: ['services'],
            },
          },
          {
            name: 'create_flowchart',
            description: 'Create a flowchart diagram',
            inputSchema: {
              type: 'object',
              properties: {
                steps: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      text: { type: 'string' },
                      type: {
                        type: 'string',
                        enum: ['start', 'process', 'decision', 'end']
                      },
                      next: {
                        type: 'array',
                        items: { type: 'string' }
                      }
                    }
                  }
                },
                title: { type: 'string' }
              },
              required: ['steps'],
            },
          },
          {
            name: 'generate_database_schema',
            description: 'Generate a database schema diagram',
            inputSchema: {
              type: 'object',
              properties: {
                tables: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      columns: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            type: { type: 'string' },
                            primaryKey: { type: 'boolean' },
                            foreignKey: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                },
                title: { type: 'string' }
              },
              required: ['tables'],
            },
          }
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_schema':
            return await this.handleCreateSchema(args);
          case 'generate_architecture_diagram':
            return await this.handleArchitectureDiagram(args);
          case 'create_flowchart':
            return await this.handleFlowchart(args);
          case 'generate_database_schema':
            return await this.handleDatabaseSchema(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async handleCreateSchema(args: any) {
    const schema = this.generator.createSchema(args.description, args.type, args.elements);
    return {
      content: [
        {
          type: 'text',
          text: `Schema created successfully!\n\nExcalidraw JSON:\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n\nYou can import this JSON into Excalidraw at https://excalidraw.com`,
        },
      ],
    };
  }

  private async handleArchitectureDiagram(args: any) {
    const diagram = this.generator.generateArchitectureDiagram(args.services, args.title);
    return {
      content: [
        {
          type: 'text',
          text: `Architecture diagram created!\n\nExcalidraw JSON:\n\`\`\`json\n${JSON.stringify(diagram, null, 2)}\n\`\`\`\n\nYou can import this JSON into Excalidraw at https://excalidraw.com`,
        },
      ],
    };
  }

  private async handleFlowchart(args: any) {
    const flowchart = this.generator.createFlowchart(args.steps, args.title);
    return {
      content: [
        {
          type: 'text',
          text: `Flowchart created!\n\nExcalidraw JSON:\n\`\`\`json\n${JSON.stringify(flowchart, null, 2)}\n\`\`\`\n\nYou can import this JSON into Excalidraw at https://excalidraw.com`,
        },
      ],
    };
  }

  private async handleDatabaseSchema(args: any) {
    const schema = this.generator.generateDatabaseSchema(args.tables, args.title);
    return {
      content: [
        {
          type: 'text',
          text: `Database schema created!\n\nExcalidraw JSON:\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n\nYou can import this JSON into Excalidraw at https://excalidraw.com`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Excalidraw server running on stdio');
  }
}

const server = new ExcalidrawMCPServer();
server.run().catch(console.error);