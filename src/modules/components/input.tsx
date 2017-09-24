import * as React from "react";
import * as Express from "express";
import { observer } from "mobx-react";

@observer
export default class Input extends React.Component<{ controller: any, editItem: string, keyField: string, type: string, id: string, placeHolder: string, required: boolean }, {}> {
    render() {
        const { controller, editItem, keyField, type, id, placeHolder, required } = this.props;
        return (
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeHolder}
                name={id}
                value={controller[editItem][keyField]}
                required={required}
                onChange={this.onChange}
            />
        );
    }

    onChange = (event) => {
        this.updateProperty(event.target.name, event.target.value)
    }

    updateProperty(key, value) {
        const { controller, editItem, keyField } = this.props;
        controller[editItem][keyField] = value;
    }
}
