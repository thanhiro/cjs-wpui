import xs from 'xstream';
import {html} from 'snabbdom-jsx';

const view = sources =>
  xs.of(
    <div>
      <h1>Home</h1>
      <p>...</p>
    </div>
  );

export default sources => ({
  DOM: view(sources)
});
