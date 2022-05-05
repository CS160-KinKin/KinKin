import sinon from 'sinon';
import Auth from '../../util/auth';

sinon.stub(Auth, 'verifyToken')
        .callsFake((req,res,next) => next());