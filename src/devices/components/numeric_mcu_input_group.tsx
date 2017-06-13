import * as React from "react";
import { McuInputBox } from "./mcu_input_box";
import { SpacePanelToolTip } from "./space_panel_tool_tip";
import { NumericMCUInputGroupProps } from "./interfaces";
import { Row } from "../../ui/row";
import { Col } from "../../ui/index";

export function NumericMCUInputGroup(props: NumericMCUInputGroupProps) {

  let { bot, dispatch, tooltip, name, x, y, z, hidden } = props;

  return <div hidden={!!hidden}>
    <Row>
      <Col xs={6}>
        <label>
          {name}
        </label>
        <SpacePanelToolTip tooltip={tooltip} />
      </Col>
      <Col xs={2}>
        <McuInputBox
          setting={x}
          bot={bot}
          dispatch={dispatch}
        />
      </Col>
      <Col xs={2}>
        <McuInputBox
          setting={y}
          bot={bot}
          dispatch={dispatch}
        />
      </Col>
      <Col xs={2}>
        <McuInputBox
          setting={z}
          bot={bot}
          dispatch={dispatch}
        />
      </Col>
    </Row>
  </div>;
}
