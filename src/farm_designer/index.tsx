import * as React from "react";
import { GardenMap } from "./map/garden_map";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { success } from "../ui";
import { Link } from "react-router";
import { t } from "i18next";
import { IndexProps } from "./interfaces";

export class Zoomer extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { currentNum: 1 }
  }
  in = () => {
    console.log("in");
    this.setState({ currentNum: this.state.currentNum + 0.1 }, () => {
      let el = document.querySelector(".farm-designer-map") as HTMLElement;
      console.log(this.state.currentNum);

      el.style.cssText = `zoom: ${this.state.currentNum}`;
    })
  }

  out = () => {
    console.log("out");
    this.setState({ currentNum: this.state.currentNum - 0.1 }, () => {
      let el = document.querySelector(".farm-designer-map") as HTMLElement;
      el.style.zoom = this.state.currentNum.toString();
    });

  }

  render() {
    return <div className="zoomer">
      <button onClick={this.in} className="button-like green">
        <i className="fa fa-plus" />
      </button>
      <button onClick={this.out} className="button-like red">
        <i className="fa fa-minus" />
      </button>
    </div>;
  }
}

@connect((state: Everything) => state)
export class FarmDesigner extends React.Component<IndexProps, {}> {
  componentDidMount() {
    success("Subscribe to the FarmBot.io mailing list for news and updates.",
      "Work in Progress");
  }

  render() {
    // Kinda nasty, similar to the old q="NoTab" we used to determine no panels.
    // This one just makes sure the designer can click it's panel tabs without
    // the other headers getting in the way. There's more re-usability in this.
    if (this.props.location.pathname === "/app/designer") {
      document.body.classList.add("designer-tab");
    } else {
      document.body.classList.remove("designer-tab");
    }

    return (
      <div className="farm-designer">
        <Zoomer />
        <div className="panel-header gray-panel designer-mobile-nav">
          <div className="panel-tabs">
            <Link to="/app/designer" className="mobile-only active">
              {t("Designer")}
            </Link>
            <Link to="/app/designer/plants">
              {t("Plants")}
            </Link>
            <Link to="/app/designer/farm_events" >
              {t("Farm Events")}
            </Link>
          </div>
        </div>
        <div className="farm-designer-panels">
          {this.props.children}
        </div>

        <div className="farm-designer-map">
          <GardenMap {...this.props} />
        </div>
      </div>
    );
  }
}

