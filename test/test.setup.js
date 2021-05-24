process.env.TZ = 'UCT';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'perseverance';

require('dotenv').config();

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
