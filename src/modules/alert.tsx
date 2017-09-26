import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx"

@observer
export class Alert extends React.Component<{ message: any }, any> {

    render() {
        const message = this.props.message;
        const alertClassName = `alert ${this.alertClass(message.type)} fade in`;

        return (
            <div className={alertClassName}>{message.text}
                <button className="close" data-dismiss="alert"> &times; </button>
            </div>
        );
    }

    alertClass = (type: string) => {
        const alertClasses = {
            error: "alert-danger",
            alert: "alert-warning",
            notice: "alert-info",
            success: "alert-success"
        }
        return alertClasses[type] || alertClasses.notice;
    }
}

@observer
export class FlashMessages extends React.Component<any, any> {
    @observable messages;
    render() {
        this.messages = this.props.messages;

        return (
            <div>
                {
                    this.messages.map(m => <Alert key={m.id} message={m} />)
                }
            </div>
        );
    }
}
