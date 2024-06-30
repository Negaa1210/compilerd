const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary

describe('Language Execution Tests', () => {
    test('Go code execution', (done) => {
        request(app)
            .post('/api/execute')
            .send({ language: 'go', script: 'package main; import "fmt"; func main() { fmt.Println("hello world") }' })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.output).toBe('hello world\n');
                done();
            });
    });

    test('Rust code execution', (done) => {
        request(app)
            .post('/api/execute')
            .send({ language: 'rust', script: 'fn main() { println!("hello world"); }' })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.output).toBe('hello world\n');
                done();
            });
    });

    test('PHP code execution', (done) => {
        request(app)
            .post('/api/execute')
            .send({ language: 'php', script: 'echo "hello world";' })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.output).toBe('hello world\n');
                done();
            });
    });
});

