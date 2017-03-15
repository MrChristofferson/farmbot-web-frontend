import * as React from "react";
import { NavBar } from "./nav";
import { Everything } from "./interfaces";
import { init } from "./ui";
import { connect } from "react-redux";
import { Spinner } from "./spinner";

/** Remove 300ms delay on touch devices - https://github.com/ftlabs/fastclick */
let fastClick = require("fastclick");
fastClick.attach(document.body);

/** For the logger module */
init();

/** If the sync object takes more than 10s to load, the user will be granted
 * access into the app, but still warned. */
const TIMEOUT_MESSAGE = `App could not be fully loaded, 
we recommend you try refreshing the page.`;

@connect((state: Everything) => state)
export default class App extends React.Component<Everything, {}> {
  componentDidMount() {
    setTimeout(() => {
      if (!this.props.sync.loaded) {
        this.props.dispatch({ type: "SYNC_TIMEOUT_EXCEEDED" });
        // alert(TIMEOUT_MESSAGE);
      }
    }, 4000);
  }

  render() {
    let syncLoaded = this.props.sync.loaded;
    let epic = syncLoaded ? " fadedis " : " ";
    // let ohnoes = setTimeout(() => "true", 2000);
    return <div className="app">
      <NavBar { ...this.props } faaade={syncLoaded} />
      {/*<Spinner fadeOut={syncLoaded} radius={33} strokeWidth={6} />*/}
      {/*<div className={"app-children-container " + epic}>*/}
      {this.props.children}
      {/*</div>*/}
    </div>;
  }
}
