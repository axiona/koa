import KoaBody from '@dikac/koa-body';
import PropertyReplaceParameters from '../../../dist/middleware/replace-parameters.js';
import PropertyReplaceParameter from '../../../dist/middleware/replace-parameter.js';
import Axios from 'axios';
import RequestPath from '../../request-path.js';
import Server from '../../server.js';
import Register from '../../../dist/router/register.js';
import Router from '@koa/router';
import Context from '../../../dist/context/context.js';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('parameters', () => {
    const server = Server();
    const router =  Register<Context<{}, {body:{ name: string, age: number }}>>(server.koa, new Router());

    beforeAll(()=>server.open());
    afterAll(()=>server.close());

    const data = {
        name : 'john',
        age : 24
    };

    const address = 'address';

    describe('parameters', () => {

        const path : string = RequestPath(__filename);

        let argument = {
            name: '',
            age: 0
        };

        let filtered = {
            name: '',
            address: ''
        };

        it('add filter', ()=>{

            router.post(path,
                KoaBody(),
                // set response
                (context, next) => {

                    context.response.body = context.request.body;
                    return next();
                },
                PropertyReplaceParameters(function (body : { name: string, age: number }) : {name : string, address : string} {

                    argument = body;

                    return {
                        name : body.name,
                        address
                    };

                }, 'response', 'body')
            );

        });

        it('send request', function (done) {

            Axios.post(`http://localhost:${server.config.port}${path}`, data).then((data)=>{

                filtered = data.data;

            }).catch(fail).finally(done);
        });

        it('assert value', function () {

            expect(argument).toEqual(data);
            expect(filtered).toEqual({name:data.name, address});

        });
    });

    describe('parameters', () => {

        const path : string = RequestPath(__filename) + 'parameter';

        let argument = {
            name: '',
            age: 0
        };

        let filtered = {
            name: '',
            address: ''
        };

        it('add filter', ()=>{

            router.post(path,
                KoaBody(),
                // set response
                (context, next) => {

                    context.response.body = context.request.body;
                    return next();
                },
                PropertyReplaceParameter<['response', 'body']>({
                    filter: function(body: { name: string, age: number }): { name: string, address: string } {

                        argument = body;

                        return {
                            name: body.name,
                            address
                        };

                    },
                    properties: ['response', 'body']
                })
            );
        });

        it('send request', function (done) {

            Axios.post(`http://localhost:${server.config.port}${path}`, data).then((data)=>{

                filtered = data.data;

            }).catch(fail).finally(done);
        });

        it('assert value', function () {

            expect(argument).toEqual(data);
            expect(filtered).toEqual({name:data.name, address});

        });
    });
});
