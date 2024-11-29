const supertest = require("supertest");

const app = require('../app');

describe("Probar el sistema de autenticación", ()=>{
    it("Debería de obtener un login con user y password correctos", (done)=>{
        supertest(app).post("/login")
        .send({email: "proyecto@uach.com", password:"abcd1234"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});