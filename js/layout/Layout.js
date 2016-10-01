import {html} from 'snabbdom-jsx';

export default function Layout(nav, content) {
  return <div>
    <header className="row">{nav}</header>
    <main className="row">{content}</main>
  </div>;
}
