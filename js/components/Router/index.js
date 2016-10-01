import xs from 'xstream';
import {div, nav, a, h3, p} from '@cycle/dom';
import {prop} from 'ramda';
import {html} from 'snabbdom-jsx';
import Layout from '../../layout/Layout';
import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';
import Article from '../../routes/Article';
import Category from '../../routes/Category';

function withParams(Component) {
  return (...params) => sources => Component({props$: xs.of(params), ...sources});
}

function intent(sources) {
  return {
    homePageClick$: sources.DOM.select(".home-link").events("click"),
    articlePageClick$: sources.DOM.select(".article-link").events("click"),
    categoryPageClick$: sources.DOM.select(".category-link").events("click"),
    ...sources
  };
}

function view(sources) {
  const {router} = sources;

  const match$ = router.define({
    '/': Home,
    '/:slug': withParams(Article),
    '/category/:slug': withParams(Category),
    '*': NotFound
  });

  const page$ = match$.map(({path, value}) =>
    value({...sources, path: router.path(path)}));

  const makeLink = (path, label, klass) =>
    <a className={klass} dataHref={path} style={{padding: '1em'}}>{label}</a>;

  const nav$ = xs.of(nav({styl  e: {marginBottom: '1em'}}, [
    makeLink('/', 'Home', 'home-link'),
    makeLink('/some-slug-here', 'Article', 'article-link'),
    makeLink('/category/my-slug', 'Category', 'category-link')
  ]));

  const view$ = page$.map(prop('DOM')).flatten();

  const vdom$ = xs.combine(nav$, view$)
    .map(([navDom, viewDom]) => Layout(navDom, viewDom));

  return {
    ...sources,
    DOM: vdom$,
    router: xs.merge(
      sources.homePageClick$.mapTo('/'),
      sources.articlePageClick$.mapTo('/some-slug-here'),
      sources.categoryPageClick$.mapTo('/category/some-slug-here')
    )
  };
}

export default sources => view(intent(sources));

