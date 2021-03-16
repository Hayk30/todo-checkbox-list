import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './loader.css'
export default class Load extends React.Component {
    render() {
        return (
            <div className="lod">
                <Loader
                    type="Circles"
                    color="#00BFFF"
                    height={200}
                    width={200}
                    timeout={0}
                />
            </div>

        );
    }
}