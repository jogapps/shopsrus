let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../../app");

const { Customer } = require("../../../../src/api/models");

// Assertion style
chai.should();

chai.use(chaiHttp);


describe("Customer Route API", () => {

    let token;
    let testAdmin = { email: "test1@gmail.com", password: "123456" };
    
    before(async () => {
        await Customer.destroy({
            where: {},
            truncate: true,
            force: true
          })
    })

    before((done) => {
        chai.request(app)
            .post("/api/v1/login")
            .send(testAdmin)
            .end((err, response) => {
                if (err) done(err);
                if (response.body.status)
                    token = response.body.data.token;
                done();
            });
    });

    describe("Customer Account (Personal)", () => {
        describe("post /api/v1/wallet/fund", () => {
            
            it("It should fail if header has no token", (done) => {
                chai.request(app)
                .post("/api/v1/customer/add")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Token is required")
                    done();
                });
            });

            it("It should fail if header token is incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/customer/add")
                .set('Authorization', "Wrong-token")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Invalid token found")
                    done();
                });
            });

            it("It should fail if required body payload is null / incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/customer/add")
                .set('Authorization', token)
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    done();
                });
            });

            it("It should create customer account if payload is correct", (done) => {
                chai.request(app)
                .post("/api/v1/customer/add")
                .set('Authorization', token)
                .send({name: "Jemifor Godspower", account_type: "EMPLOYEE"})
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("Customer created Successfully!")
                    done();
                });
            });
        });
    });


});