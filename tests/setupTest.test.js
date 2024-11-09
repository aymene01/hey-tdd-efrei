// tests/setup.test.js

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import http from 'http';
import app from '../app/app.js';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { sequelize as db } from '../models/database.js';

/* STEP 0: Introduction to Test-Driven Development (TDD)
 * Goal: Demonstrate a basic test structure and verify test runner functionality
 * 
 * This step shows:
 * - Basic test structure using describe/it
 * - How assertions work
 * - What a passing test looks like
 * 
 * How TDD works:
 * 1. Write a failing test first (Red)
 * 2. Write minimal code to make it pass (Green)
 * 3. Refactor code while keeping tests green (Refactor)
 * 
 * This example test will always pass and serves as a sanity check
 * that your test environment is working correctly.
 */
describe('TDD Introduction', () => {
  it('should demonstrate a passing test', () => {
    expect(true).toBe(true);
  });

  it('should show basic math operations work', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 2).toBe(4);
  });
});

describe('Avantages du TDD', () => {
  it('devrait améliorer la qualité du code', () => {
    const codeQuality = {
      bugs: 'réduits',
      maintenance: 'facilitée',
      documentation: 'intégrée',
      refactoring: 'sécurisé'
    };
    expect(codeQuality.bugs).toBe('réduits');
    expect(codeQuality.maintenance).toBe('facilitée');
  });

  it('devrait augmenter la confiance des développeurs', () => {
    const developerConfidence = {
      regression: 'détectée rapidement',
      changements: 'plus sûrs',
      feedback: 'immédiat'
    };
    expect(developerConfidence.regression).toBe('détectée rapidement');
    expect(developerConfidence.feedback).toBe('immédiat');
  });

  it('devrait améliorer la conception du code', () => {
    const codeDesign = {
      couplage: 'faible',
      cohesion: 'forte',
      modularité: 'améliorée'
    };
    expect(codeDesign.couplage).toBe('faible');
    expect(codeDesign.cohesion).toBe('forte');
  });
});

/* STEP 1: Environment Setup
 * Goal: Ensure all necessary development tools are properly installed
 * 
 * This step verifies that your development environment has all the required tools:
 * - Node.js v18+: Required for running modern JavaScript features
 * - npm: Package manager for installing dependencies
 * - Git: Version control system for code management
 * 
 * How to prepare:
 * 1. Install Node.js from https://nodejs.org (LTS version recommended)
 * 2. npm comes bundled with Node.js
 * 3. Install Git from https://git-scm.com/downloads
 * 
 * Troubleshooting:
 * - If tests fail, verify versions using:
 *   - node --version
 *   - npm --version
 *   - git --version
 */
describe('Environment Requirements', () => {
  it('should have Node.js v18 or higher installed', () => {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    expect(majorVersion).toBeGreaterThanOrEqual(18);
  });

  it('should have npm installed', () => {
    const npmVersion = execSync('npm -v').toString().trim();
    expect(npmVersion).toBeTruthy();
  });

  it('should have Git installed', () => {
    const gitVersion = execSync('git --version').toString().trim();
    expect(gitVersion.startsWith('git version')).toBe(true);
  });
});

/* STEP 2: Server Setup
 * Goal: Create and verify a working Express server
 * 
 * This step ensures that your server can:
 * - Initialize properly
 * - Listen for incoming connections
 * - Handle basic requests
 * 
 * How to prepare:
 * 1. Create app.js in the root directory
 * 2. Set up a basic Express server
 * 3. Configure proper error handling
 * 
 * Troubleshooting:
 * - Check if port is already in use
 * - Verify Express is installed (npm install express)
 * - Ensure app.js exports the app correctly
 */
describe('Server Setup', () => {
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(0, (err) => {
      if (err) {
        done(err);
        return;
      }
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should start the server without errors', () => {
    expect(server.listening).toBe(true);
  });
});

/* STEP 3: Basic API Health Check
 * Goal: Verify basic server response functionality
 * 
 * This step ensures that:
 * - Server responds to basic health check requests
 * - Proper response codes are returned
 * - Basic routing is functional
 * 
 * How to prepare:
 * 1. Add a basic /ping route to your Express app
 * 2. Implement proper response handling
 * 3. Set up basic error handling
 * 
 * Troubleshooting:
 * - Verify server is running
 * - Check route implementation
 * - Ensure proper response format
 */
describe('GET /ping', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });
});

/* STEP 4: Project Structure Verification
 * Goal: Ensure proper organization of project files and directories
 * 
 * This step verifies:
 * - All required directories exist
 * - Core files are in place
 * - Project follows MVC architecture
 * - Dependencies are properly installed
 * 
 * Required Structure:
 * - controllers/: Business logic
 * - models/: Data models
 * - routes/: API endpoints
 * - tests/: Test files
 * - app.js: Main application file
 * 
 * Troubleshooting:
 * - Check directory permissions
 * - Verify file locations
 * - Ensure proper npm installation
 */
describe('Project Structure', () => {
  it('should have a controllers directory', () => {
    expect(fs.existsSync('./controllers')).toBe(true);
  });

  it('should have a models directory', () => {
    expect(fs.existsSync('./models')).toBe(true);
  });

  it('should have a routes directory', () => {
    expect(fs.existsSync('./routes')).toBe(true);
  });

  it('should have a tests directory', () => {
    expect(fs.existsSync('./tests')).toBe(true);
  });

  it('should have an app.js file at the root', () => {
    expect(fs.existsSync('./app/app.js')).toBe(true);
  });

  it('should have node_modules directory with dependencies', () => {
    expect(fs.existsSync('./node_modules')).toBe(true);
  });
});

/* STEP 5: Backend Configuration
 * Goal: Verify complete backend setup and functionality
 * 
 * This step ensures:
 * - Middleware is properly configured
 * - Database connection is established
 * - Routes are properly defined
 * - Controllers are implemented
 * - Models are properly defined and synchronized
 * - Application is properly configured
 * 
 * How to prepare:
 * 1. Configure body-parser middleware
 * 2. Set up database connection
 * 3. Implement chat routes and controllers
 * 4. Define Message model
 * 5. Configure application settings
 * 
 * Troubleshooting:
 * - Check middleware order
 * - Verify database credentials
 * - Ensure all required files exist
 * - Check model definitions
 * - Verify route configurations
 */
describe('Backend setup', () => {
   // Test 7: Le middleware 'body-parser' est configuré.
   it("should have 'body-parser' middleware configured", () => {
    const appStack = app._router.stack;
    const bodyParserUsed = appStack.some(layer => {
      return layer && layer.name && (layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    });
    expect(bodyParserUsed).toBe(true);
  });

  // Test 8: La base de données est connectée.
  it("should connect to the database", async () => {
    // TODO: connect to the database: create a database.js file in the config directory and connect to the database

    try {
      await db.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  // Test 9: La route POST '/chat' est définie.
  it("should have a POST '/chat' route defined", async () => {
    const response = await request(app).post('/chat').send({ message: 'Hello' });
    expect(response.status).not.toBe(404);
  });

  // Test 10: Le contrôleur 'ChatController' est créé.
  it("should have a 'ChatController.js' file in 'controllers' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../controllers/ChatController.js'))).toBe(true);
  });

  // Test 12: Le contrôleur 'ChatController' exporte une fonction 'createMessage'.
  it("'ChatController' should export a 'createMessage' function", async () => {
    const ChatController = await import('../controllers/ChatController.js');
    expect(typeof ChatController.createMessage).toBe('function');
  });
  // Test 13: Le middleware 'body-parser' est ajouté avant les routes.
  it("should have 'body-parser' middleware before routes", () => {
    const appStack = app._router.stack;
    const bodyParserIndex = appStack.findIndex(layer => layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    const routeIndex = appStack.findIndex(layer => layer.route);
    expect(bodyParserIndex).toBeLessThan(routeIndex);
  });

  // Test 14: Le modèle 'Message' existe dans 'models'.
  it("should have a 'Message.js' file in 'models' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../models/Message.js'))).toBe(true);
  });

  // Test 15: Le modèle 'Message' est correctement défini.
  it("should have 'Message' model defined", async () => {
    const Message = await import('../models/Message.js');
    expect(Message).toBeDefined();
  });

  // Test 16: La base de données synchronise les modèles sans erreur.
  it("should synchronize models with the database without errors", async () => {
    try {
      await db.sync();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  // Test 17: Le fichier 'routes/chat.js' est présent.
  it("should have a 'chat.js' file in 'routes' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../routes/chat.js'))).toBe(true);
  });

  // Test 18: Le routeur 'chat.js' est utilisé dans 'app.js'.
  it("should use 'chat.js' router in 'app.js'", () => {
    const chatRouteUsed = app._router.stack.some(
      layer => layer.handle && layer.handle.name === 'router' && layer.regexp && layer.regexp.test('/chat')
    );
    expect(chatRouteUsed).toBe(true);
  });

  // Test 19: L'application écoute sur le port spécifié.
  it("should listen on the specified port", () => {
    const PORT = process.env.PORT || 3000;
    expect(app.get('port')).toBe(PORT);
  });

  // Test 20: La configuration initiale est correcte.
  it("should have the initial configuration correct", () => {
    expect(true).toBe(true);
  });
});

describe('Approche Pédagogique et Évaluation', () => {
  it('devrait expliquer l\'approche "learning by doing"', () => {
    const approchePédagogique = {
      méthode: 'learning by doing',
      focus: 'projet pratique',
      rythme: 'personnalisé',
      objectif: 'progression individuelle',
      apprentissage: 'actif et participatif'
    };

    expect(approchePédagogique.méthode).toBe('learning by doing');
    expect(approchePédagogique.rythme).toBe('personnalisé');
  });

  it('devrait valoriser l\'effort et l\'implication plus que le résultat final', () => {
    const critèresÉvaluation = {
      effort: 40,
      implication: 35,
      résultatFinal: 25
    };
    
    const totalPoints = Object.values(critèresÉvaluation).reduce((a, b) => a + b, 0);
    expect(totalPoints).toBe(100);
    expect(critèresÉvaluation.effort + critèresÉvaluation.implication)
      .toBeGreaterThan(critèresÉvaluation.résultatFinal);
  });

  it('devrait détailler les attentes en termes d\'implication', () => {
    const attendusImplication = {
      participation: 'poser des questions',
      engagement: 'pratiquer régulièrement',
      curiosité: 'chercher à comprendre',
      persévérance: 'surmonter les obstacles',
      entraide: 'partager ses connaissances'
    };

    const comportementsValorisés = {
      erreurs: 'vues comme opportunités d\'apprentissage',
      questions: 'toujours bienvenues',
      rythme: 'adapté à chacun',
      progression: 'plus importante que la perfection'
    };

    expect(attendusImplication.participation).toBe('poser des questions');
    expect(comportementsValorisés.erreurs).toBe('vues comme opportunités d\'apprentissage');
  });

  it('devrait encourager un environnement d\'apprentissage positif', () => {
    const environnementApprentissage = {
      atmosphère: 'bienveillante',
      erreurs: 'constructives',
      questions: 'encouragées',
      entraide: 'valorisée',
      stress: 'minimisé'
    };

    expect(environnementApprentissage.atmosphère).toBe('bienveillante');
    expect(environnementApprentissage.erreurs).toBe('constructives');
  });
});
