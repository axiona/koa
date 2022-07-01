import KoaBody from '@dikac/koa-body';
import Axios, {AxiosResponse} from 'axios';
import RequestPath from '../../request-path';
import Server from '../../server';
import Register from '../../../dist/router/register';
import Router from '@koa/router';
import Passthroughs from '../../../dist/middleware/passthroughs';
import ApplicationContext from '../../../dist/context/context';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

const path : string = RequestPath(__filename);

describe('test', () => {

    const server = Server();
    const router =  Register<ApplicationContext>(server.koa, new Router());

    let called1 : boolean = false;
    let called2 : boolean = false;

    let response : AxiosResponse<string>;

    beforeAll(()=>server.open());
    afterAll(()=>server.close());

    it('add request', ()=>{

        router.post(path,
            KoaBody(),
            Passthroughs(context => {
                called1 = true;
            }),
            function (context, next) {

                context.response.body = 'OK';
                return next();
            },
            Passthroughs(context => {
                called2 = true;
            }),

        );
    });

    it('send request', function (done) {

        Axios.post(`http://localhost:${server.config.port}${path}`, {}).then((data)=>{

            response = data;

        }).catch(fail).finally(done);
    });

    it('assert value', function () {

        expect(called1).toBe(true);
        expect(called2).toBe(true);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('OK');
        expect(response.statusText).toEqual('OK');

    });

});
