/*
l'objectif est de couvrir les cas suivants :
Le gestionnaire de connexions est un Singleton.
La Factory crée des instances de connexions selon le type.
La connexion 'MySQL' peut être créée.
La connexion 'PostgreSQL' peut être créée.
Toutes les connexions créées par la Factory héritent de la classe de base 'Connection'.
Le gestionnaire de connexions stocke les connexions créées.
Le gestionnaire de connexions renvoie la même instance lorsqu'il est appelé plusieurs fois.
La méthode connect() est disponible sur les instances de connexion.
La méthode disconnect() est disponible sur les instances de connexion.
Les connexions peuvent être fermées via le gestionnaire.
Le gestionnaire peut fournir une liste des connexions actives.
*/
// tests/connectionManager.test.js

import { describe, it, expect } from 'vitest';
import ConnectionManager from '../lib/ConnectionManager.js';
import Connection from '../lib/Connection.js';

describe('ConnectionManager Singleton & Factory', () => {
  // Test 1: Le gestionnaire de connexions est un Singleton.
  it('should be a Singleton instance', () => {
    const manager1 = ConnectionManager.getInstance();
    const manager2 = ConnectionManager.getInstance();
    expect(manager1).toBe(manager2);
  });

  // Test 2: La Factory crée des instances de connexions selon le type.
  it('should create connections based on type', () => {
    const manager = ConnectionManager.getInstance();
    const mysqlConnection = manager.createConnection('MySQL');
    const postgresConnection = manager.createConnection('PostgreSQL');
    expect(mysqlConnection.type).toBe('MySQL');
    expect(postgresConnection.type).toBe('PostgreSQL');
  });

  // Test 3: La connexion 'MySQL' peut être créée.
  it('should create a MySQL connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection.type).toBe('MySQL');
  });

  // Test 4: La connexion 'PostgreSQL' peut être créée.
  it('should create a PostgreSQL connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('PostgreSQL');
    expect(connection.type).toBe('PostgreSQL');
  });

  // Test 5: Toutes les connexions créées par la Factory héritent de la classe de base 'Connection'.
  it('all connections should inherit from Connection base class', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection instanceof Connection).toBe(true);  // Updated line
  });

  // Test 6: Le gestionnaire de connexions stocke les connexions créées.
  it('should store created connections', () => {
    const manager = ConnectionManager.getInstance();
    manager.createConnection('MySQL');
    expect(manager.connections.length).toBeGreaterThan(0);
  });

  // Test 7: Le gestionnaire de connexions renvoie la même instance lorsqu'il est appelé plusieurs fois.
  it('should return the same instance when called multiple times', () => {
    const manager1 = ConnectionManager.getInstance();
    const manager2 = ConnectionManager.getInstance();
    expect(manager1).toBe(manager2);
  });

  // Test 8: La méthode `connect()` est disponible sur les instances de connexion.
  it('connections should have a connect method', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(typeof connection.connect).toBe('function');
  });

  // Test 9: La méthode `disconnect()` est disponible sur les instances de connexion.
  it('connections should have a disconnect method', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(typeof connection.disconnect).toBe('function');
  });

  // Test 10: Les connexions peuvent être fermées via le gestionnaire.
  it('should be able to close connections via the manager', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    manager.closeConnection(connection);
    expect(connection.isConnected).toBe(false);
  });

  // Test 11: Le gestionnaire peut fournir une liste des connexions actives.
  it('should provide a list of active connections', () => {
    const manager = ConnectionManager.getInstance();
    const mysql = manager.createConnection('MySQL');
    const postgres = manager.createConnection('PostgreSQL');
    
    // Connect both connections
    mysql.connect();
    postgres.connect();
    
    const activeConnections = manager.getActiveConnections();
    expect(activeConnections.length).toBe(2);
  });

  // Test 12: Les connexions ont une propriété 'type' correspondant au type de base de données.
  it('connections should have a type property', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection.type).toBeDefined();
  });

  // Test 13: La Factory lève une exception pour un type de connexion inconnu.
  it('should throw an error for unknown connection types', () => {
    const manager = ConnectionManager.getInstance();
    expect(() => manager.createConnection('UnknownDB')).toThrow();
  });

  // Test 14: Le gestionnaire empêche la création manuelle de nouvelles instances.
  it('should prevent manual creation of new instances', () => {
    const Manager = ConnectionManager;
    expect(() => new Manager()).toThrow();
  });

  // Test 15: Les méthodes du gestionnaire sont correctement définies.
  it('manager should have properly defined methods', () => {
    const manager = ConnectionManager.getInstance();
    expect(typeof manager.createConnection).toBe('function');
    expect(typeof manager.closeConnection).toBe('function');
    expect(typeof manager.getActiveConnections).toBe('function');
  });

  // Test 16: Les connexions peuvent exécuter des requêtes simulées.
  it('connections should be able to execute queries', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    const result = connection.query('SELECT * FROM users');
    expect(result).toBe('Executed query on MySQL: SELECT * FROM users');
  });

  // Test 17: La connexion 'SQLite' peut être créée via la Factory.
  it('should create a SQLite connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('SQLite');
    expect(connection.type).toBe('SQLite');
  });

  // Test 18: Les connexions gardent une trace de leur état (connecté/déconnecté).
  it('connections should keep track of their state', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    connection.connect();
    expect(connection.isConnected).toBe(true);
    connection.disconnect();
    expect(connection.isConnected).toBe(false);
  });

  // Test 19: Le comportement est conforme au pattern Singleton.
  it('should behave according to the Singleton pattern', () => {
    const instance1 = ConnectionManager.getInstance();
    const instance2 = ConnectionManager.getInstance();
    expect(instance1).toStrictEqual(instance2);
  });

  // Test 20: Le comportement est conforme au pattern Factory.
  it('should create different connection types via the Factory pattern', () => {
    const manager = ConnectionManager.getInstance();
    const connectionTypes = ['MySQL', 'PostgreSQL', 'SQLite'];
    connectionTypes.forEach(type => {
      const connection = manager.createConnection(type);
      expect(connection.type).toBe(type);
    });
  });
});