import React, { Component } from 'react';
import axios from "axios";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {

        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        state = {
            pendingApiCall: false
        };

        componentDidMount() {
            this.requestInterceptors = axios.interceptors.request.use(request => {
                console.log("geldim", apiPath);
                this.updateApiCallFor(request.url, true);
                return request;
            });

            this.responseInterceptors = axios.interceptors.response.use(
                response => {
                    this.updateApiCallFor(response.config.url, false);
                    return response;
                },
                error => {
                    this.updateApiCallFor(error.config.url, false);
                    throw error;
                });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress });
            }
        }

        render() {
            const { pendingApiCall } = this.state;
            return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
        }
    }
}
