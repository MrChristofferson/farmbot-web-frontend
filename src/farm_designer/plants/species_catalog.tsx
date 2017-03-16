import * as React from "react";
import { BackArrow } from "../../ui";
import { Everything } from "../../interfaces";
import { connect } from "react-redux";
import { t } from "i18next";
import { OpenFarmSearch } from "./openfarm_search";

@connect((state: Everything) => state)
export class SpeciesCatalog extends React.Component<Everything, {}> {
  doSearch = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.dispatch({
      type: "SEARCH_QUERY_CHANGE",
      payload: e.currentTarget.value
    });
  }

  render() {
    let { cropSearchQuery } = this.props.designer;

    return <div className="panel-container green-panel species-catalog-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow /> {t("Choose a species")}
        </p>
      </div>
      <div className="panel-content">
        <div className="thin-search-wrapper">
          <i className="fa fa-search"></i>

          <div className="thin-search">
            <input value={cropSearchQuery}
              onChange={(e) => { this.doSearch(e); }}
              className="search"
              placeholder="Search OpenFarm" />

          </div>
        </div>
        <div className="panel-content">
          <div className="crop-search-result-wrapper row">
            <OpenFarmSearch {...this.props} query={cropSearchQuery} />
          </div>
        </div>
      </div>
    </div>;
  }
}
