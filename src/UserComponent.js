import React from "react";
import './css/common.css'

export class UserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className="center">
                {/* <div className="center"> What's your userId..? </div> */}
                <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit}>
                    <div> <label> 
                                <input placeholder="What's your userId..?" className="input" type="text" name="userId" />
                            </label>
                                <br /> 
                    </div>

                </form>
            </div>
        );
    }

    onSubmit(event) {
        event.preventDefault();

        let data = event.target;
        this.props.setUser(data.userId.value);
    }
}