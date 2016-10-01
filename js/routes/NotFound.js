import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export default function NotFound(sources) {
  const vdom$ = xs.of(
    <div>
      <h1>404 - Page not found</h1>
      <p>Please click on the links above to check the examples.</p>
    </div>);

  return {
    DOM: vdom$
  };
}
