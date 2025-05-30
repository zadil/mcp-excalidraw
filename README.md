# MCP Excalidraw Server

Un serveur MCP (Model Context Protocol) pour générer des schémas et diagrammes Excalidraw.

## Installation

```bash
npm install
npm run build
```

## Configuration

Ajoutez ce serveur à votre configuration Claude Desktop (`claude_desktop_config.json`) :

```json
{
  "mcpServers": {
    "mcp-excalidraw": {
      "command": "node",
      "args": ["/path/to/your/mcp-excalidraw/dist/index.js"]
    }
  }
}
```

Ou via npm :

```json
{
  "mcpServers": {
    "mcp-excalidraw": {
      "command": "npx",
      "args": ["mcp-excalidraw"]
    }
  }
}
```

## Outils disponibles

### 1. `create_schema`
Crée un schéma Excalidraw général à partir d'une description.

**Paramètres :**
- `description` (string) : Description du schéma à créer
- `type` (enum) : Type de schéma ('flowchart', 'architecture', 'database', 'network', 'wireframe', 'mind_map')
- `elements` (array, optionnel) : Éléments spécifiques à inclure

**Exemple :**
```
Peux-tu créer un schéma de type "architecture" pour "Système de gestion de commandes en ligne"
```

### 2. `generate_architecture_diagram`
Génère un diagramme d'architecture système.

**Paramètres :**
- `services` (array) : Liste des services avec leurs types et connexions
- `title` (string, optionnel) : Titre du diagramme

**Exemple :**
```json
{
  "services": [
    {
      "name": "Frontend Web",
      "type": "frontend",
      "connections": ["API Gateway"]
    },
    {
      "name": "API Gateway", 
      "type": "api",
      "connections": ["User Service", "Order Service"]
    },
    {
      "name": "User Service",
      "type": "service", 
      "connections": ["User Database"]
    },
    {
      "name": "Order Service",
      "type": "service",
      "connections": ["Order Database", "Message Queue"]
    },
    {
      "name": "User Database",
      "type": "database"
    },
    {
      "name": "Order Database", 
      "type": "database"
    },
    {
      "name": "Message Queue",
      "type": "queue"
    }
  ],
  "title": "E-commerce Architecture"
}
```

### 3. `create_flowchart`
Crée un diagramme de flux.

**Paramètres :**
- `steps` (array) : Étapes du processus
- `title` (string, optionnel) : Titre du diagramme

**Exemple :**
```json
{
  "steps": [
    {
      "id": "start",
      "text": "Début",
      "type": "start",
      "next": ["login"]
    },
    {
      "id": "login", 
      "text": "Connexion utilisateur",
      "type": "process",
      "next": ["check_auth"]
    },
    {
      "id": "check_auth",
      "text": "Authentifié?",
      "type": "decision", 
      "next": ["dashboard", "error"]
    },
    {
      "id": "dashboard",
      "text": "Afficher tableau de bord",
      "type": "process",
      "next": ["end"]
    },
    {
      "id": "error",
      "text": "Erreur d'authentification",
      "type": "process",
      "next": ["login"]
    },
    {
      "id": "end",
      "text": "Fin",
      "type": "end"
    }
  ],
  "title": "Processus de connexion"
}
```

### 4. `generate_database_schema`
Génère un schéma de base de données.

**Paramètres :**
- `tables` (array) : Tables avec leurs colonnes
- `title` (string, optionnel) : Titre du schéma

**Exemple :**
```json
{
  "tables": [
    {
      "name": "users",
      "columns": [
        {"name": "id", "type": "INT", "primaryKey": true},
        {"name": "username", "type": "VARCHAR(50)"},
        {"name": "email", "type": "VARCHAR(100)"},
        {"name": "created_at", "type": "TIMESTAMP"}
      ]
    },
    {
      "name": "orders",
      "columns": [
        {"name": "id", "type": "INT", "primaryKey": true},
        {"name": "user_id", "type": "INT", "foreignKey": "users.id"},
        {"name": "total", "type": "DECIMAL(10,2)"},
        {"name": "status", "type": "VARCHAR(20)"},
        {"name": "created_at", "type": "TIMESTAMP"}
      ]
    },
    {
      "name": "order_items",
      "columns": [
        {"name": "id", "type": "INT", "primaryKey": true},
        {"name": "order_id", "type": "INT", "foreignKey": "orders.id"},
        {"name": "product_name", "type": "VARCHAR(100)"},
        {"name": "quantity", "type": "INT"},
        {"name": "price", "type": "DECIMAL(10,2)"}
      ]
    }
  ],
  "title": "E-commerce Database Schema"
}
```

## Utilisation

Une fois configuré, vous pouvez demander à Claude de créer des schémas :

- "Crée-moi un diagramme d'architecture pour une application de chat en temps réel"
- "Génère un flowchart pour le processus de commande e-commerce"
- "Crée un schéma de base de données pour un système de blog"
- "Fais-moi un wireframe pour une page d'accueil"

Le serveur retournera du JSON Excalidraw que vous pouvez importer directement sur https://excalidraw.com.

## Types de schémas supportés

1. **Flowchart** : Diagrammes de flux avec start, process, decision, end
2. **Architecture** : Diagrammes d'architecture système avec services, bases de données, API
3. **Database** : Schémas de base de données avec tables, colonnes, relations
4. **Network** : Diagrammes de réseau avec routeurs, devices
5. **Wireframe** : Maquettes d'interface utilisateur
6. **Mind Map** : Cartes mentales avec nœud central et branches

## Développement

```bash
# Mode développement avec watch
npm run dev

# Build
npm run build

# Test local
node dist/index.js
```
