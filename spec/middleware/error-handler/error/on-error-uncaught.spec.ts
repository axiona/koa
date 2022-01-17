// import RequestPath from "../../../requespath";
// import Axios, {AxiosResponse} from "axios";
//
// import KoaBody from "koa-body";
// import Error from "../../../../dist/middleware/error-handler/error-parameters";
// import Register from "../../../../dist/route/register";
// import Router from "@koa/router";
// import Server from "../../../server";
//
// it("force console log", () => { spyOn(console, 'log').and.callThrough();});
//
// class TestError extends globalThis.Error {
//
// }
//
// describe('default use', () => {
//
//     const path : string = RequestPath(__filename);
//
//     const server = Server();
//     const router =  Register(server.koa, new Router());
//     beforeAll(()=>server.open());
//     afterAll(()=>server.close());
//
//     let error : boolean = false;
//     let testError : boolean = false;
//
//     // let rethrown : boolean = false;
//     let response : AxiosResponse<{name : string, address : string}>|undefined;
//     let dataValue : {name : string, address : string} = {
//         name : 'jhon',
//         address : 'earth'
//     };
//
//     it('add request', ()=>{
//
//         server.koa.on('error', Error(function () {
//
//             error = true;
//
//         }, globalThis.Error));
//
//         server.koa.on('error', Error(function () {
//
//             testError = true;
//
//         }, TestError));
//
//         router.post(path,
//             KoaBody(),
//             function (context, next) {
//
//                 throw new globalThis.Error('error occurred "uncaught by the router" (cannot be caught)');
//             },
//         );
//
//     });
//
//     it('send request', function (done) {
//
//         Axios.post(`http://localhost:${server.config.port}${path}`, dataValue).then((data)=>{
//
//             fail('response 500 should fail');
//
//         }).catch((err)=>response = err.response).finally(done);
//     });
//
//     it('assert value', function () {
//
//         expect((response as AxiosResponse).status).toEqual(500);
//         expect(error).toBe(true);
//         expect(testError).toBe(false);
//         // expect(error).toEqual(undefined);
//         expect((response as AxiosResponse).statusText).toEqual('Internal Server Error');
//     })
// });
//
//