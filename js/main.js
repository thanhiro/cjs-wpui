import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {createHistory} from 'history';
import {makeRouterDriver} from 'cyclic-router';
import switchPath from 'switch-path';
import Main from './root';

const drivers = {
  DOM: makeDOMDriver('#root'),
  router: makeRouterDriver(createHistory(), switchPath)
};

run(Main, drivers);
